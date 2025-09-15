import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SimpleLink from "@/component/common/SimpleLink";
import PrimaryLink from "@/component/common/PrimaryLink";

export const revalidate = 60;

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name?.split(" ")[0] || "User";
  const dashboardId = session?.user.dashboard;

  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center">
        {/* Welcome Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Formify, {userName}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create amazing forms with AI in minutes. Let&lsquo;s get started!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <PrimaryLink
            link={"/dashboard/" + dashboardId + "/forms/new"}
            className="w-fit"
          >
            Create a New Form
          </PrimaryLink>
        </div>
        <div className="max-w-xl grid grid-cols-2 w-full gap-3">
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={"/dashboard/" + dashboardId + "/overview"}
          >
            Overview
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={"/dashboard/" + dashboardId + "/forms"}
          >
            My Forms
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={"/dashboard/" + dashboardId + "/submissions"}
          >
            Submissions
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={"/dashboard/" + dashboardId + "/setting"}
          >
            Setting
          </SimpleLink>
        </div>

        {/* Simple Feature Highlight */}
        <div className="pt-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Powered by AI • Analytics • Customizable Templates
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
