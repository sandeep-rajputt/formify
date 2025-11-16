"use client";
import React from "react";
import SimpleCard from "@/component/common/SimpleCard";
import { IoFileTrayOutline } from "react-icons/io5";

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

function TopForms({ forms }: { forms: Form[] }) {
  const maxSubmissions = Math.max(...forms.map((f) => f.submissionsCount), 1);

  return (
    <>
      <SimpleCard className="w-full">
        <h2 className="text-xl font-semibold mb-4">Top Forms by Submissions</h2>
        {forms.length === 0 ? (
          <p className="text-light-fg-muted dark:text-dark-fg-muted text-center py-8">
            No submissions yet
          </p>
        ) : (
          <div className="space-y-4">
            {forms.map((form, index) => {
              const percentage = (form.submissionsCount / maxSubmissions) * 100;
              return (
                <div key={form._id} className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted">
                          #{index + 1}
                        </span>
                        <h3 className="font-medium text-light-fg dark:text-dark-fg">
                          {form.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoFileTrayOutline
                          className="text-brand-primary"
                          size={16}
                        />
                        <span className="font-semibold">
                          {form.submissionsCount}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-light-surface dark:bg-dark-surface rounded-full h-2">
                      <div
                        className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SimpleCard>
    </>
  );
}

export default TopForms;
