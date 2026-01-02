"use client";
import React from "react";
import UserSVG from "@/component/svg/UserSVG";
import ThemeChanger from "@/app/dashboard/[dashboard]/_components/layout/sidebar/ThemeChanger";
import { useSession } from "next-auth/react";
import Image from "next/image";
import EllipsisText from "@/component/common/EllipsisText";

function DashboardSidebarAccountClient() {
  const { data: session } = useSession();
  const name: string = session?.user?.name || "Your Name";
  const email: string = session?.user?.email || "yourmail@mail.com";
  const image: string | null = session?.user?.image || null;

  return (
    <div className="border-t-1 border-light-bg dark:border-dark-bg p-5 flex flex-col gap-3">
      <div>
        <ThemeChanger />
      </div>
      <div className="flex items-center gap-2 px-2">
        <div>
          {image ? (
            <Image
              src={image}
              alt="User Avatar"
              width={25}
              height={25}
              className="w-[25px] h-[25px] rounded-full object-cover"
            />
          ) : (
            <UserSVG size={25} className="opacity-70" />
          )}
        </div>
        <div className="flex flex-col -gap-1">
          <p className="w-full opacity-90 text-sm">
            <EllipsisText>{name}</EllipsisText>
          </p>
          <p className="w-full text-xs opacity-50">
            <EllipsisText>{email}</EllipsisText>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebarAccountClient;
