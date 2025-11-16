"use client";
import React from "react";
import SimpleCard from "@/component/common/SimpleCard";
import { format } from "date-fns";

type Form = {
  _id: string;
  formId: string;
  title: string;
  description?: string;
  status: "draft" | "published";
  submissionsCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};

function RecentForms({ forms }: { forms: Form[] }) {
  return (
    <>
      <SimpleCard className="w-full">
        <h2 className="text-xl font-semibold mb-4">Recent Forms</h2>
        {forms.length === 0 ? (
          <p className="text-light-fg-muted dark:text-dark-fg-muted text-center py-8">
            No forms created yet
          </p>
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <div key={form._id} className="cursor-pointer">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-light-fg dark:text-dark-fg">
                      {form.title}
                    </h3>
                    <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                      Created {format(new Date(form.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {form.submissionsCount}
                      </p>
                      <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted">
                        Submissions
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        form.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {form.status.charAt(0).toUpperCase() +
                        form.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SimpleCard>
    </>
  );
}

export default RecentForms;
