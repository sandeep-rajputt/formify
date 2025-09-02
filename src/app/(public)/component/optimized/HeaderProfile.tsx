import { CiSettings } from "react-icons/ci";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import Separator from "@/component/headlessui/Separator";
import MenuLink from "@/component/headlessui/MenuLink";
import EllipsisText from "@/component/common/EllipsisText";
import HeaderProfileClient from "@/app/(public)/component/optimized/HeaderProfileClient";

// This would be where you fetch user data from database
async function getUserData() {
  // TODO: Replace with actual database call
  return {
    name: "Sandeep Rajput",
    email: "rajputsandeep@gmail.com",
    avatar: "/me.png",
  };
}

async function HeaderProfile() {
  const userData = await getUserData();

  const profileMenuItems = (
    <>
      <div className="px-3 py-0.5">
        <h3 className="font-semibold ">
          <EllipsisText>{userData.name}</EllipsisText>
        </h3>
        <p className="text-sm/6 -mt-1 text-light-fg-muted dark:text-dark-fg-muted">
          <EllipsisText>{userData.email}</EllipsisText>
        </p>
      </div>
      <Separator />
      <MenuLink title="Dashboard" link="profile">
        <LuLayoutDashboard className="text-light-fg-muted dark:text-dark-fg-muted" />
        <EllipsisText>Dashboard</EllipsisText>
      </MenuLink>
      <MenuLink title="My Forms" link="leaderboard">
        <MdOutlineLibraryBooks className="text-light-fg-mut dark:text-dark-fg-muted" />
        <EllipsisText>My Forms</EllipsisText>
      </MenuLink>
      <MenuLink title="Settings" link="settings">
        <CiSettings className="text-light-fg-mut dark:text-dark-fg-muted" />
        <EllipsisText>Settings</EllipsisText>
      </MenuLink>
      <Separator />
    </>
  );

  return (
    <HeaderProfileClient
      userData={userData}
      profileMenuItems={profileMenuItems}
    />
  );
}

export default HeaderProfile;
