import getServerSessionUser from "@/hooks/useServerSessionUser";
import { redirect } from "next/navigation";
import OverviewContent from "@/app/dashboard/[dashboard]/overview/_components/OverviewContent";

async function Page() {
  const user = await getServerSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6 pb-10">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Welcome {user.name}</h1>
        <p className="text-light-fg-muted dark:text-dark-fg-muted">
          Manage your forms and see recent activity
        </p>
      </div>

      <OverviewContent user={user} />
    </div>
  );
}

export default Page;
