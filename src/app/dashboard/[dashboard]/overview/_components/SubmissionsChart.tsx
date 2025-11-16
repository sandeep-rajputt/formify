"use client";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SimpleCard from "@/component/common/SimpleCard";
import NewListbox from "@/component/headlessui/NewListbox";
import ListBoxBtn from "@/component/headlessui/ListboxBtn";
import ListboxOpts from "@/component/headlessui/ListboxOpts";
import ListboxOptn from "@/component/headlessui/ListboxOptn";
import {
  format,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
  subDays,
} from "date-fns";
import { useGetRecentSubmissionsMutation } from "@/lib/api/features/dashboardApi";

type FilterOption = {
  id: number;
  name: string;
};

const timeFilters: FilterOption[] = [
  { id: 0, name: "All Time" },
  { id: 1, name: "This Month" },
  { id: 2, name: "This Week" },
];

type Submission = {
  formId: string;
  submittedAt: string;
};

function SubmissionsChart({ userId }: { userId: string }) {
  const [selected, setSelected] = useState<FilterOption>(timeFilters[0]);
  const [chartData, setChartData] = useState<
    { date: string; submissions: number }[]
  >([]);
  const [getRecentSubmissions, { isLoading }] =
    useGetRecentSubmissionsMutation();

  useEffect(() => {
    const processChartData = (submissions: Submission[]) => {
      const now = new Date();
      let dateRange: Date[] = [];

      if (selected.id === 2) {
        // This Week
        const weekStart = startOfWeek(now, { weekStartsOn: 0 });
        dateRange = eachDayOfInterval({ start: weekStart, end: now });
      } else if (selected.id === 1) {
        // This Month
        const monthStart = startOfMonth(now);
        dateRange = eachDayOfInterval({ start: monthStart, end: now });
      } else {
        // All Time - last 30 days
        dateRange = eachDayOfInterval({ start: subDays(now, 29), end: now });
      }

      const submissionsByDate = submissions.reduce(
        (acc: Record<string, number>, sub) => {
          const date = format(new Date(sub.submittedAt), "yyyy-MM-dd");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {}
      );

      const formattedData = dateRange.map((date) => ({
        date: format(
          date,
          selected.id === 0 ? "MMM dd" : selected.id === 1 ? "MMM dd" : "EEE"
        ),
        submissions: submissionsByDate[format(date, "yyyy-MM-dd")] || 0,
      }));

      setChartData(formattedData);
    };

    const fetchSubmissions = async () => {
      try {
        const result = await getRecentSubmissions({
          userId,
          time: selected.id.toString(),
        }).unwrap();
        processChartData(result.submissions || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 60000);
    return () => clearInterval(interval);
  }, [selected, userId, getRecentSubmissions]);

  return (
    <SimpleCard className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Submissions Overview</h2>
        <NewListbox selected={selected} handleChange={setSelected}>
          <ListBoxBtn className="min-w-[140px]">{selected.name}</ListBoxBtn>
          <ListboxOpts>
            {timeFilters.map((filter) => (
              <ListboxOptn key={filter.id} data={filter} selected={selected} />
            ))}
          </ListboxOpts>
        </NewListbox>
      </div>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Loading...
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="colorSubmissions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(33, 37, 41, 0.95)",
                  border: "1px solid rgba(227, 232, 243, 0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#e3e8f3",
                }}
              />
              <Area
                type="monotone"
                dataKey="submissions"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSubmissions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </SimpleCard>
  );
}

export default SubmissionsChart;
