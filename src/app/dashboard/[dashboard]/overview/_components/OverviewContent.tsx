"use client";
import { useGetDashboardOverviewQuery } from "@/lib/api/features/dashboardApi";
import OverviewCards from "./OverviewCards";
import SubmissionsChart from "./SubmissionsChart";
import RecentForms from "./RecentForms";
import TopForms from "./TopForms";

function OverviewContent({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetDashboardOverviewQuery(userId, {
    pollingInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="w-full">
          <div className="h-8 bg-light-surface dark:bg-dark-surface rounded animate-pulse w-64" />
          <div className="h-4 bg-light-surface dark:bg-dark-surface rounded animate-pulse w-96 mt-2" />
        </div>
        <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-light-surface dark:bg-dark-surface rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-warning">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OverviewCards
        totalForms={data.data.totalForms}
        totalSubmissions={data.data.totalSubmissions}
        publishedForms={data.data.publishedForms}
      />

      <SubmissionsChart userId={userId} />

      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        <RecentForms forms={data.data.recentForms} />
        <TopForms forms={data.data.formsSubmissions} userId={userId} />
      </div>
    </div>
  );
}

export default OverviewContent;
