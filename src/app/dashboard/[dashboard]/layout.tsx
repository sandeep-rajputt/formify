import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardHeader from "@/app/dashboard/[dashboard]/_components/layout/Header";
import SidebarWrapper from "@/app/dashboard/[dashboard]/_components/layout/sidebar/SidebarWrapper";
import DashboardSidebar from "@/app/dashboard/[dashboard]/_components/layout/sidebar/Sidebar";
import DashboardContentWrapper from "@/app/dashboard/[dashboard]/_components/layout/DashboardContentWrapper";

async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dashboard: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }
  const { dashboard } = await params;
  if (`/dashboard/${dashboard}` !== `/dashboard/${session.user.dashboard}`) {
    redirect(`/dashboard/${session.user.dashboard}`);
  }

  return (
    <div className="h-dvh overflow-hidden">
      <DashboardHeader />
      <div className="relative h-[calc(100dvh-80px)]">
        <SidebarWrapper>
          <DashboardSidebar />
        </SidebarWrapper>
        <DashboardContentWrapper>{children}</DashboardContentWrapper>
      </div>
    </div>
  );
}

export default DashboardLayout;
