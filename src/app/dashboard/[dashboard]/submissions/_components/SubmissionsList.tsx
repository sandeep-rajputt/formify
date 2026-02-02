"use client";
import { useState } from "react";
import LoadingCircle from "@/component/common/LoadingCircle";
import SubmissionDetailsModal from "@/app/dashboard/[dashboard]/submissions/_components/SubmissionDetailsModal";

interface Form {
  _id: string;
  formId: string;
  title: string;
  submissionsCount: number;
  status: "draft" | "published";
}

interface Submission {
  _id: string;
  formId: string;
  submittedAt: string;
  answers: Record<string, unknown>;
  submitterInfo?: {
    ipAddress?: string;
    userAgent?: string;
  };
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalSubmissions: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface SubmissionsListProps {
  submissions: Submission[];
  forms: Form[];
  loading: boolean;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

function SubmissionsList({
  submissions,
  forms,
  loading,
  pagination,
  onPageChange,
}: SubmissionsListProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const getFormTitle = (formId: string) => {
    const form = forms.find((f) => f.formId === formId);
    return form?.title || "Unknown Form";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAnswerPreview = (answers: Record<string, unknown>) => {
    const entries = Object.entries(answers);
    if (entries.length === 0) return "No answers";

    const firstAnswer = entries[0][1];
    if (typeof firstAnswer === "string") {
      return firstAnswer.length > 50
        ? firstAnswer.substring(0, 50) + "..."
        : firstAnswer;
    }
    return String(firstAnswer);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingCircle />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 text-center">
        <div className="text-light-fg-muted dark:text-dark-fg-muted">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
          <p>
            Submissions will appear here once people start filling out your
            forms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-surface-alt dark:bg-dark-surface-alt">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-fg-muted dark:text-dark-fg-muted uppercase tracking-wider">
                  Form
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-fg-muted dark:text-dark-fg-muted uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-fg-muted dark:text-dark-fg-muted uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-fg-muted dark:text-dark-fg-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-fg/10 dark:divide-dark-fg/10">
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-light-fg dark:text-dark-fg">
                      {getFormTitle(submission.formId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                      {formatDate(submission.submittedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-light-fg-muted dark:text-dark-fg-muted max-w-xs truncate">
                      {getAnswerPreview(submission.answers)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-brand-primary hover:text-brand-primary/80 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-3 border-t border-light-fg/10 dark:border-dark-fg/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                Showing {submissions.length} of {pagination.totalSubmissions}{" "}
                submissions
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 text-sm border border-light-fg/20 dark:border-dark-fg/20 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt"
                >
                  Previous
                </button>
                <span className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => onPageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 text-sm border border-light-fg/20 dark:border-dark-fg/20 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          formTitle={getFormTitle(selectedSubmission.formId)}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
}

export default SubmissionsList;
