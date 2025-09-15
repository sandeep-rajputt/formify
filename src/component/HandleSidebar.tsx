"use client";
// /component/HandleSidebar.tsx
// this file is for set sidebar open if large screen

import { useAppDispatch } from "@/hooks/reduxToolkit";
import { openSidebar } from "@/Store/slice/dashboardSidebarSlice";
import { useEffect } from "react";

function HandleSidebar({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        dispatch(openSidebar());
      }
    };
    handleResize();
  }, []);

  return children;
}

export default HandleSidebar;
