import React from "react";
import DashboardSidebarLink from "@/app/dashboard/[dashboard]/_components/layout/sidebar/DashboardSidebarLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type sidebar = {
  name: string;
  link: string;
  logo: string;
}[];

async function DashboardSideBarLinks() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const sidebarLinks: sidebar = [
    {
      name: "Overview",
      link: `/dashboard/${user?.dashboard}/overview`,
      logo: "overview",
    },
    {
      name: "My Forms",
      link: `/dashboard/${user?.dashboard}/forms`,
      logo: "forms",
    },
    {
      name: "Submissions",
      link: `/dashboard/${user?.dashboard}/submissions`,
      logo: "submissions",
    },
    {
      name: "Setting",
      link: `/dashboard/${user?.dashboard}/setting`,
      logo: "setting",
    },
  ];
  return (
    <div className="p-5">
      <ul className="flex flex-col gap-3">
        {sidebarLinks.map((item) => {
          return <DashboardSidebarLink key={item.name} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default DashboardSideBarLinks;
