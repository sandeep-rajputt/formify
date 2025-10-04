"use client";
import { useAppSelector } from "@/hooks/reduxToolkit";
import { useIsLargeScreen } from "@/app/dashboard/[dashboard]/_hooks/useIsLargeScreen";

function DashboardContentWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAppSelector((state) => state.dashboardSidebar);
  const isLargeScreen = useIsLargeScreen();

  return (
    <div
      className={`transition-all h-[calc(100dvh-80px)] overflow-hidden duration-300 ${
        isOpen || isLargeScreen ? "2xl:ml-64 ml-0" : "ml-0"
      }`}
    >
      <div className="overflow-y-scroll py-5 h-full scrollbar">{children}</div>
    </div>
  );
}

export default DashboardContentWrapper;
