"use client";
import { useAppSelector } from "@/hooks/reduxToolkit";
import { useEffect, useRef } from "react";
import { useIsLargeScreen } from "@/app/dashboard/[dashboard]/_hooks/useIsLargeScreen";
import { closeSidebar } from "@/Store/slice/dashboardSidebarSlice";
import { useAppDispatch } from "@/hooks/reduxToolkit";

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAppSelector((state) => state.dashboardSidebar);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isLargeScreen = useIsLargeScreen();

  function handleOutsideClick(event: MouseEvent) {
    if (isLargeScreen) return;
    if (!isOpen) return;
    if (sidebarRef.current) {
      if (!sidebarRef.current.contains(event.target as Node)) {
        dispatch(closeSidebar());
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <aside
      ref={sidebarRef}
      className={`absolute top-0 left-0 z-50 h-full bg-light-surface 2xl:shadow-none shadow-lg w-64 dark:bg-dark-surface transition-all duration-300 ${
        isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {children}
    </aside>
  );
}

export default SidebarWrapper;
