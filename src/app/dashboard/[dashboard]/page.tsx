import DatePicker from "./_components/common/DatePicker";
import SimpleLink from "@/component/common/SimpleLink";
import PrimaryLink from "@/component/common/PrimaryLink";

// export meta data
export async function generateMetadata() {
  return {
    title: "Dashboard - Fromify",
    description: "Dashboard for managing forms and submissions",
  };
}

async function Dashboard({
  params,
}: {
  params: Promise<{ dashboard: string }>;
}) {
  const { dashboard } = await params;
  const basePath = `/dashboard/${dashboard}`;
  const appURL = process.env.NEXT_PUBLIC_APP_URL;

  const res = await fetch(`${appURL}/api/dashboard/${dashboard}`, {
    cache: "force-cache",
    method: `GET`,
  });

  if (!res.ok) {
    // log the error
    console.error(
      "Failed to fetch dashboard data:",
      res.status,
      res.statusText
    );

    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The dashboard you are looking for does not exist or you do not have
            permission to access it.
          </p>
          <PrimaryLink link="/">Go to Homepage</PrimaryLink>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const userName = data.name;

  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div>
            <DatePicker mode="range" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Formify, {userName}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create amazing forms with AI in minutes. Let&lsquo;s get started!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <PrimaryLink link={`${basePath}/forms/new`} className="w-fit">
            Create a New Form
          </PrimaryLink>
        </div>
        <div className="max-w-xl grid grid-cols-2 w-full gap-3">
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={`${basePath}/overview`}
          >
            Overview
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={`${basePath}/forms`}
          >
            My Forms
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={`${basePath}/submissions`}
          >
            Submissions
          </SimpleLink>
          <SimpleLink
            className="border-2 border-light-surface dark:border-dark-surface text-center inline-block"
            link={`${basePath}/setting`}
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
