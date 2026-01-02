import DashboardSideBarLinks from "@/app/dashboard/[dashboard]/_components/layout/sidebar/DashboardSideBarLinks";
import DashboardSidebarAccountClient from "./DashboardSidebarAccountClient";

function DashboardSidebar() {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full overflow-hidden">
      <div className="overflow-y-scroll scrollbar">
        <DashboardSideBarLinks />
      </div>
      <div>
        <DashboardSidebarAccountClient />
      </div>
    </div>
  );
}

export default DashboardSidebar;
