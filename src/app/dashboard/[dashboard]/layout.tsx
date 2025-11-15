import { redirect } from "next/navigation";
import DashboardHeader from "@/app/dashboard/[dashboard]/_components/layout/Header";
import SidebarWrapper from "@/app/dashboard/[dashboard]/_components/layout/sidebar/SidebarWrapper";
import DashboardSidebar from "@/app/dashboard/[dashboard]/_components/layout/sidebar/Sidebar";
import DashboardContentWrapper from "@/app/dashboard/[dashboard]/_components/layout/DashboardContentWrapper";
import Container from "@/component/layout/Container";
import getServerSessionUser from "@/hooks/useServerSessionUser";

async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dashboard: string }>;
}) {
  const user = await getServerSessionUser();
  if (!user) redirect("/login");

  const { dashboard } = await params;
  if (`/dashboard/${dashboard}` !== `/dashboard/${user.dashboard}`) {
    redirect(`/dashboard/${user.dashboard}`);
  }

  return (
    <div className="h-dvh overflow-hidden" id="main-container">
      <DashboardHeader />
      <div className="relative h-[calc(100dvh-80px)]">
        <SidebarWrapper>
          <DashboardSidebar />
        </SidebarWrapper>
        <DashboardContentWrapper>
          <Container>{children}</Container>
        </DashboardContentWrapper>
      </div>
    </div>
  );
}

export default DashboardLayout;
