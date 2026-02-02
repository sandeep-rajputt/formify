import getServerSessionUser from "@/hooks/useServerSessionUser";
import { redirect } from "next/navigation";
import SubmissionsContent from "./_components/SubmissionsContent";

async function SubmissionsPage() {
  const user = await getServerSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-light-fg-muted dark:text-dark-fg-muted">
            View and manage form submissions
          </p>
        </div>
      </div>

      <SubmissionsContent user={user} />
    </div>
  );
}

export default SubmissionsPage;
