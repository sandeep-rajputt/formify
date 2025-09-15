"use client";
import { useAppSelector } from "@/hooks/reduxToolkit";
import { useIsLargeScreen } from "@/app/dashboard/[dashboard]/_hooks/useIsLargeScreen";

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAppSelector((state) => state.dashboardSidebar);
  const isLargeScreen = useIsLargeScreen();

  return (
    <aside
      className={`absolute top-0 left-0 z-50 h-full bg-light-surface 2xl:shadow-none shadow-lg w-64 dark:bg-dark-surface transition-all duration-300 ${
        isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {children}
    </aside>
  );
}

export default SidebarWrapper;
