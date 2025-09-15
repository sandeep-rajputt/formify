import DashboardSideBarLinks from "@/app/dashboard/[dashboard]/_components/layout/sidebar/DashboardSideBarLinks";
import DashboardSidebarAccount from "./DashboardSidebarAccount";

function DashboardSidebar() {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full overflow-hidden">
      <div className="overflow-y-scroll scrollbar">
        <DashboardSideBarLinks />
      </div>
      <div>
        <DashboardSidebarAccount />
      </div>
    </div>
  );
}

export default DashboardSidebar;
