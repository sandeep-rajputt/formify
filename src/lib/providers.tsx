"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/Store/store";
import { useEffect } from "react";
import HandleSidebar from "@/component/HandleSidebar";

type ThemeMode = "light" | "dark" | "system";

const applyTheme = (theme: ThemeMode) => {
  if (typeof window !== "undefined") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }
};

function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeMode) || "system";
    applyTheme(savedTheme);
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        <HandleSidebar>{children}</HandleSidebar>
      </Provider>
    </SessionProvider>
  );
}

export default Providers;
