"use client";

import { useState, useEffect } from "react";
import ListBoxBtn from "@/component/headlessui/ListboxBtn";
import NewListbox from "@/component/headlessui/NewListbox";
import ListboxOpts from "@/component/headlessui/ListboxOpts";
import ListboxOptn from "@/component/headlessui/ListboxOptn";
import MonitorSVG from "@/component/svg/MonitorSVG";
import LightSVG from "@/component/svg/LightSVG";
import DarkSVG from "@/component/svg/DarkSVG";
import React from "react";

interface SVGProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

type ThemeMode = "light" | "dark" | "system";

type ModeOption = {
  id: number;
  name: ThemeMode;
  icon: React.FC<SVGProps>;
};

const modes: ModeOption[] = [
  { id: 1, name: "light", icon: LightSVG },
  { id: 2, name: "dark", icon: DarkSVG },
  { id: 3, name: "system", icon: MonitorSVG },
];

export default function ThemeChanger() {
  const [selected, setSelected] = useState<ModeOption | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme =
        (localStorage.getItem("theme") as ThemeMode) || "system";
      const mode = modes.find((m) => m.name === savedTheme) || modes[2];
      setSelected(mode);
    }
  }, []);

  useEffect(() => {
    if (selected) applyTheme(selected.name);
  }, [selected]);

  // Function to apply theme
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

  const handleChange = (mode: { id: number; name: string }) => {
    setSelected(modes.find((m) => m.id === mode.id) || null);
  };

  if (!selected) return null;

  return (
    <div className="w-full">
      <NewListbox
        selected={{ id: selected.id, name: selected.name }}
        handleChange={handleChange}
      >
        <ListBoxBtn className="w-full">{selected.name}</ListBoxBtn>
        <ListboxOpts className="z-100">
          {modes.map((mode) => (
            <ListboxOptn
              key={mode.id}
              data={{ id: mode.id, name: mode.name }}
              selected={{ id: selected.id, name: selected.name }}
            >
              <div className="flex items-center gap-2">
                <mode.icon size={16} />
                <div className="text-sm">
                  {mode.name.charAt(0).toUpperCase() + mode.name.slice(1)}
                </div>
              </div>
            </ListboxOptn>
          ))}
        </ListboxOpts>
      </NewListbox>
    </div>
  );
}
