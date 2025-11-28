import Link from "next/link";
import SimpleCard from "@/component/common/SimpleCard";
import PrimaryLink from "@/component/common/PrimaryLink";
import getServerSessionUser from "@/hooks/useServerSessionUser";

async function NotFound() {
  const user = await getServerSessionUser();
  return (
    <div className="min-h-screen w-full relative dark:bg-black flex flex-col">
      {/* Northern Aurora */}
      <div
        className="absolute inset-0 z-0 dark:block hidden pointer-events-none"
        style={{
          backgroundImage: `
        radial-gradient(ellipse 80% 60% at 15% 15%, rgba(139, 92, 246, 0.15), transparent 50%),
        radial-gradient(ellipse 70% 55% at 85% 20%, rgba(59, 130, 246, 0.12), transparent 50%),
        radial-gradient(ellipse 75% 60% at 20% 85%, rgba(168, 85, 247, 0.10), transparent 50%),
        radial-gradient(ellipse 65% 50% at 90% 90%, rgba(14, 165, 233, 0.08), transparent 50%)`,
        }}
      />

      <div
        className="absolute inset-0 z-0 dark:hidden block pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 15%, rgba(139, 92, 246, 0.08), transparent 50%),
                    radial-gradient(ellipse 70% 55% at 85% 20%, rgba(59, 130, 246, 0.06), transparent 50%),
                    radial-gradient(ellipse 75% 60% at 20% 85%, rgba(168, 85, 247, 0.05), transparent 50%),
                    radial-gradient(ellipse 65% 50% at 90% 90%, rgba(14, 165, 233, 0.04), transparent 50%)`,
        }}
      />

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl">
          <SimpleCard className="p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 text-center">
              <h1 className="text-9xl font-extrabold tracking-tighter text-light-fg dark:text-dark-fg">
                404
              </h1>
              <p className="mt-4 text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-light-fg-muted to-light-fg dark:from-dark-fg-muted dark:to-dark-fg">
                Page Not Found
              </p>
              <p className="mt-6 max-w-md mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
                It looks like the page you were looking for doesn&apos;t exist
                or has been moved.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryLink
                  link="/"
                  title="Go to Homepage"
                  className="!text-base px-8 py-4 w-full sm:w-auto"
                >
                  <span className="text-xl">🏠</span>
                  Go to Homepage
                </PrimaryLink>
                <Link
                  href={user ? `/dashboard/${user.dashboard}` : `/login`}
                  title={user ? "Go to Dashboard" : "Login"}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-light-surface-alt/70 dark:bg-dark-surface-alt text-light-fg dark:text-dark-fg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📊</span>
                  {user ? "Go to Dashboard" : "Login"}
                </Link>
              </div>
            </div>
          </SimpleCard>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
