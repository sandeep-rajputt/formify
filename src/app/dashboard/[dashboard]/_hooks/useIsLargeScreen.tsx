"use client";
import { useState, useEffect } from "react";

const LARGE_SCREEN_BREAKPOINT = 1280;

export function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    };

    // Set the initial value after mounting on the client
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
}
