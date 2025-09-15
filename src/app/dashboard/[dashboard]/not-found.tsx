import React from "react";
import Link from "next/link";
import PrimaryCard from "@/component/common/PrimaryCard";
import PrimaryLink from "@/component/common/PrimaryLink";
import NotFoundIcon from "@/component/svg/NotFoundIcon";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function DashboardNotFound() {
  const session = await getServerSession(authOptions);
  const dashboardId = session?.user.dashboard || "dashboard";

  return (
    <div className="flex items-center justify-center min-h-full w-full ">
      <div className="max-w-2xl w-full">
        <PrimaryCard className="text-center flex flex-col !w-full items-center justify-center py-10 my-10">
          {/* 404 Number */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-brand-primary opacity-80">
              404
            </h1>
            <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-3 pt-5">
            <h2 className="text-xl font-semibold text-light-fg dark:text-dark-fg">
              Page Not Found
            </h2>
            <p className="text-light-fg-muted dark:text-dark-fg-muted leading-relaxed max-w-md text-sm">
              The page you&lsquo;re looking for doesn&lsquo;t exist or has been
              moved. Let&lsquo;s get you back to your dashboard.
            </p>
          </div>

          <div className="py-3">
            <div className="w-24 h-24 mx-auto bg-light-surface-alt dark:bg-dark-surface-alt rounded-full flex items-center justify-center">
              <NotFoundIcon size={50} className="opacity-50" />
            </div>
          </div>

          <div className="space-y-3 pt-5">
            <PrimaryLink link={`/${dashboardId}/overview`} className="w-full">
              Back to Dashboard Overview
            </PrimaryLink>

            <Link
              href={`/${dashboardId}`}
              className="block w-full text-center py-2.5 px-5 rounded-full border border-light-surface dark:border-dark-surface text-light-fg-muted dark:text-dark-fg-muted hover:bg-light-surface dark:hover:bg-dark-surface transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Help Text */}
          <div className="pt-4 border-t border-light-surface dark:border-dark-surface">
            <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
              Need help?
              <Link
                href="/contact"
                className="text-brand-primary hover:underline ml-1"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </PrimaryCard>
      </div>
    </div>
  );
}
