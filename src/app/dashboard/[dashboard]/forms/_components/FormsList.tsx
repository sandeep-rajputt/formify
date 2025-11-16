"use client";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import SimpleCard from "@/component/common/SimpleCard";
import { FaRegFileAlt } from "react-icons/fa";
import { IoFileTrayOutline, IoEyeOutline } from "react-icons/io5";
import { MdPublic } from "react-icons/md";
import FormDetailsModal from "./FormDetailsModal";
import { User } from "next-auth";

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

type Props = {
  forms: Form[];
  isLoading: boolean;
  isError: boolean;
  user: User;
};

function FormsList({ forms, isLoading, isError, user }: Props) {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormClick = (e: React.MouseEvent, form: Form) => {
    e.preventDefault();
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedForm(null), 200);
  };
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-48 bg-light-surface dark:bg-dark-surface rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-warning">Failed to load forms</p>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <SimpleCard className="text-center py-12">
        <FaRegFileAlt
          className="mx-auto mb-4 text-light-fg-muted dark:text-dark-fg-muted"
          size={48}
        />
        <h3 className="text-xl font-semibold mb-2">No forms found</h3>
        <p className="text-light-fg-muted dark:text-dark-fg-muted mb-6">
          Create your first form to get started
        </p>
        <Link
          href={`/dashboard/${user.dashboard}/forms/new`}
          className="inline-block px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          Create Form
        </Link>
      </SimpleCard>
    );
  }

  return (
    <>
      <FormDetailsModal
        form={selectedForm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {forms.map((form) => (
          <div key={form._id} onClick={(e) => handleFormClick(e, form)}>
            <SimpleCard className="h-full hover:border-brand-primary/30 transition-all cursor-pointer group">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-primary transition-colors line-clamp-1">
                      {form.title}
                    </h3>
                    {form.description && (
                      <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted line-clamp-2">
                        {form.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      form.status === "published"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {form.status === "published" ? (
                      <span className="flex items-center gap-1">
                        <MdPublic size={12} />
                        Published
                      </span>
                    ) : (
                      "Draft"
                    )}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-light-fg/10 dark:border-dark-fg/10">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-light-fg-muted dark:text-dark-fg-muted">
                        <IoFileTrayOutline size={16} />
                        <span>{form.submissionsCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-light-fg-muted dark:text-dark-fg-muted">
                        <IoEyeOutline size={16} />
                        <span>{form.views}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted mt-2">
                    Updated {format(new Date(form.updatedAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </SimpleCard>
          </div>
        ))}
      </div>
    </>
  );
}

export default FormsList;
