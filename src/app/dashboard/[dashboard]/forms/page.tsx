import getServerSessionUser from "@/hooks/useServerSessionUser";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormsContent from "./_components/FormsContent";
import { FiPlus } from "react-icons/fi";

async function FormsPage() {
  const user = await getServerSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-light-fg-muted dark:text-dark-fg-muted">
            Manage and organize your forms
          </p>
        </div>
        <Link
          href={`/dashboard/${user.dashboard}/forms/new`}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          <FiPlus size={20} />
          Create Form
        </Link>
      </div>

      <FormsContent userId={user.dashboard} user={user} />
    </div>
  );
}

export default FormsPage;
