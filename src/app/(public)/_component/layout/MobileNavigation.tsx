"use client";
import { MenuButton } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";
import DropDown from "@/component/headlessui/DropDown";
import LoggedinMobileNavLinks from "@/app/(public)/_component/optimized/LoggedinMobileNavLinks";
import LoggedoutMobileNavLinks from "@/app/(public)/_component/optimized/LoggedoutMobileNavLinks";
import Separator from "@/component/headlessui/Separator";
import MenuLink from "@/component/headlessui/MenuLink";

import type { NavigationProps } from "@/types";

function MobileNavigation({ loggedin, pathname }: NavigationProps) {
  return (
    <div className="lg:hidden block">
      <DropDown
        className="text-bt-primary dark:text-wt-primary mt-2"
        anchor="bottom start"
        mainButton={<SideBarButton />}
      >
        <div className="px-3 py-1.5">Navigation Links</div>
        <Separator />
        {loggedin ? (
          <>
            <LoggedinMobileNavLinks pathname={pathname} />
          </>
        ) : (
          <>
            <LoggedoutMobileNavLinks pathname={pathname} />
            <div className="xs:hidden block">
              <Separator />
              <MenuLink
                link="login"
                title="Login to account"
                className={`!bg-brand-primary !hover:bg-brand-primary !text-white  data-focus:bg-brand-primary font-semibold `}
              >
                <span className="flex items-center justify-center w-full">
                  Login
                </span>
              </MenuLink>
            </div>
          </>
        )}
      </DropDown>
    </div>
  );
}

function SideBarButton() {
  return (
    <MenuButton className="h-full flex items-center cursor-pointer focus:outline-none">
      <IoMdMenu size={20} />
    </MenuButton>
  );
}

export default MobileNavigation;
