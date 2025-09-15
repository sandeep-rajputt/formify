import OverviewSVG from "@/component/svg/OverviewSVG";
import FormsSVG from "@/component/svg/FormsSVG";
import SettingSVG from "@/component/svg/SettingSVG";
import Separator from "@/component/headlessui/Separator";
import MenuLink from "@/component/headlessui/MenuLink";
import EllipsisText from "@/component/common/EllipsisText";
import HeaderProfileClient from "@/app/(public)/_component/optimized/HeaderProfileClient";
import type { UserData } from "@/types";

async function HeaderProfile({ user }: { user: UserData }) {
  const profileMenuItems = (
    <>
      <div className="px-3 py-0.5">
        <h3 className="font-semibold ">
          <EllipsisText>{user.name}</EllipsisText>
        </h3>
        <p className="text-sm/6 -mt-1 text-light-fg-muted dark:text-dark-fg-muted">
          <EllipsisText>{user.email}</EllipsisText>
        </p>
      </div>
      <Separator />
      <MenuLink title="Dashboard" link={`/dashboard/${user.dashboard}`}>
        <OverviewSVG size={14} />
        <EllipsisText>Dashboard</EllipsisText>
      </MenuLink>
      <MenuLink title="My Forms" link={`/dashboard/${user.dashboard}/forms`}>
        <FormsSVG size={14} />
        <EllipsisText>My Forms</EllipsisText>
      </MenuLink>
      <MenuLink title="Setting" link={`/dashboard/${user.dashboard}/setting`}>
        <SettingSVG size={14} />
        <EllipsisText>Settings</EllipsisText>
      </MenuLink>
      <Separator />
    </>
  );

  return (
    <HeaderProfileClient userData={user} profileMenuItems={profileMenuItems} />
  );
}

export default HeaderProfile;
