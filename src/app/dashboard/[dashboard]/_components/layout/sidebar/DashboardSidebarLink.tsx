"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OverviewSVG from "@/component/svg/OverviewSVG";
import SubmissionsSVG from "@/component/svg/SubmissionsSVG";
import SettingSVG from "@/component/svg/SettingSVG";
import FormsSVG from "@/component/svg/FormsSVG";
import TemplatesSVG from "@/component/svg/TemplatesSVG";

type Item = {
  name: string;
  link: string;
  logo: string;
};

function DashboardSidebarLink({ item }: { item: Item }): ReactNode {
  const pathname = usePathname();

  return (
    <li className={`w-full relative`}>
      <div
        className={`${
          item.link === pathname &&
          "before:absolute before:-left-0.5 before:top-0 before:bottom-0 before:w-4 before:rounded-full before:bg-brand-primary before:-z-10"
        }`}
      >
        <Link
          href={`${item.link}`}
          className={`w-full rounded-md inline-block hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors duration-100 ${
            item.link === pathname &&
            "bg-light-surface-alt dark:bg-dark-surface-alt"
          }`}
        >
          <div
            className={`w-full h-full flex items-center gap-1.5 py-2 px-3 opacity-90 hover:opacity-100 transition-opacity duration-100 ${
              item.link === pathname && "opacity-100"
            }`}
          >
            {item.logo === "overview" && <OverviewSVG size={20} />}
            {item.logo === "forms" && <FormsSVG size={20} />}
            {item.logo === "templates" && <TemplatesSVG size={20} />}
            {item.logo === "submissions" && <SubmissionsSVG size={20} />}
            {item.logo === "setting" && <SettingSVG size={20} />}

            <span className="text-[15px] font-normal tracking-wide">
              {item.name}
            </span>
          </div>
        </Link>
      </div>
    </li>
  );
}

export default DashboardSidebarLink;
