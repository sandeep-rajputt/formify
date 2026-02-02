"use client";
import { useState, useEffect } from "react";
import SubmissionsList from "@/app/dashboard/[dashboard]/submissions/_components/SubmissionsList";
import SubmissionsFilters from "@/app/dashboard/[dashboard]/submissions/_components/SubmissionsFilters";
import LoadingCircle from "@/component/common/LoadingCircle";

interface SubmissionsContentProps {
  user: {
    id: string;
    dashboard: string;
    name: string;
    email: string;
  };
}

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

function SubmissionsContent({ user }: SubmissionsContentProps) {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>("all");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSubmissions: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  // Fetch user's forms
  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await fetch(`/api/dashboard/${user.dashboard}/forms`);
        if (response.ok) {
          const data = await response.json();
          setForms(data.forms || []);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, [user.dashboard]);

  // Fetch submissions for selected form
  useEffect(() => {
    async function fetchSubmissions() {
      if (selectedFormId === "all") {
        // For "all", we'll need to fetch submissions from all forms
        setSubmissionsLoading(true);
        try {
          const allSubmissions: Submission[] = [];
          let totalCount = 0;

          for (const form of forms) {
            const response = await fetch(
              `/api/forms/${form.formId}/submissions?page=1&limit=50`,
            );
            if (response.ok) {
              const data = await response.json();
              if (data.success) {
                allSubmissions.push(...data.data.submissions);
                totalCount += data.data.pagination.totalSubmissions;
              }
            }
          }

          // Sort by submission date (newest first)
          allSubmissions.sort(
            (a, b) =>
              new Date(b.submittedAt).getTime() -
              new Date(a.submittedAt).getTime(),
          );

          setSubmissions(allSubmissions);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalSubmissions: totalCount,
            hasNextPage: false,
            hasPrevPage: false,
          });
        } catch (error) {
          console.error("Error fetching all submissions:", error);
        } finally {
          setSubmissionsLoading(false);
        }
      } else if (selectedFormId) {
        // Fetch submissions for specific form
        setSubmissionsLoading(true);
        try {
          const response = await fetch(
            `/api/forms/${selectedFormId}/submissions?page=1&limit=20`,
          );
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setSubmissions(data.data.submissions);
              setPagination(data.data.pagination);
            }
          }
        } catch (error) {
          console.error("Error fetching submissions:", error);
        } finally {
          setSubmissionsLoading(false);
        }
      }
    }

    if (forms.length > 0) {
      fetchSubmissions();
    }
  }, [selectedFormId, forms]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SubmissionsFilters
        forms={forms}
        selectedFormId={selectedFormId}
        onFormChange={setSelectedFormId}
      />

      <SubmissionsList
        submissions={submissions}
        forms={forms}
        loading={submissionsLoading}
        pagination={pagination}
        onPageChange={(page: number) => {
          // Handle pagination if needed
          console.log("Page change:", page);
        }}
      />
    </div>
  );
}

export default SubmissionsContent;
