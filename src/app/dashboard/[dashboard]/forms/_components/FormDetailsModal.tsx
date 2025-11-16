"use client";
import NewPortal from "@/component/common/NewPortal";
import { IoClose, IoEyeOutline, IoCopyOutline } from "react-icons/io5";
import { MdEdit, MdDelete, MdPublic } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useState } from "react";
import PrimaryLink from "@/component/common/PrimaryLink";
import { User } from "next-auth";
import SimpleLink from "@/component/common/SimpleLink";
import ConfirmationModal from "@/component/common/ConfirmationModal";
import {
  useToggleFormVisibilityMutation,
  useDeleteFormMutation,
} from "@/lib/api/features/dashboardApi";

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
  form: Form | null;
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

function FormDetailsModal({ form, isOpen, onClose, user }: Props) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);

  const [toggleVisibility, { isLoading: isTogglingVisibility }] =
    useToggleFormVisibilityMutation();
  const [deleteForm, { isLoading: isDeletingForm }] = useDeleteFormMutation();

  if (!form) return null;

  const formUrl = `${process.env.NEXT_PUBLIC_APP_URL as string}/f/${
    form.formId
  }`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleVisibility = () => {
    setChangingStatus(true);
  };

  const changeStatus = async () => {
    try {
      const response = await toggleVisibility(form.formId).unwrap();
      if (response.status === 200) {
        setChangingStatus(false);
        onClose();
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteForm(form.formId).unwrap();
      if (response.status === 200) {
        setIsDeleting(false);
        onClose();
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <NewPortal>
      {changingStatus && (
        <NewPortal>
          <ConfirmationModal
            handleConfirm={changeStatus}
            handleCancel={() => setChangingStatus(false)}
            heading={
              form.status === "draft" ? "Publish Form" : "Unpublish Form"
            }
          >
            <p>
              Are you sure you want to{" "}
              {form.status === "draft" ? "publish" : "unpublish"} this form?
            </p>
          </ConfirmationModal>
        </NewPortal>
      )}

      {isDeleting && (
        <NewPortal>
          <ConfirmationModal
            handleConfirm={confirmDelete}
            handleCancel={() => setIsDeleting(false)}
            heading="Delete Form"
            danger={true}
          >
            <p>
              Are you sure you want to delete this form? This action cannot be
              undone.
            </p>
          </ConfirmationModal>
        </NewPortal>
      )}

      <div className="relative z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-xl bg-light-bg dark:bg-dark-bg border border-light-fg/10 dark:border-dark-fg/10 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-light-fg/10 dark:border-dark-fg/10">
              <div className="text-2xl font-bold flex items-center gap-3">
                <FaRegFileAlt className="text-brand-primary" size={24} />
                {form.title}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                  Description
                </h3>
                <p className="text-light-fg dark:text-dark-fg">
                  {form.description || "No description provided"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                    Form ID
                  </h3>
                  <p className="text-light-fg dark:text-dark-fg font-mono text-sm">
                    {form.formId}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                    Status
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      form.status === "published"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {form.status === "published" && <MdPublic size={12} />}
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                    Submissions
                  </h3>
                  <p className="text-2xl font-bold text-light-fg dark:text-dark-fg">
                    {form.submissionsCount}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                    Views
                  </h3>
                  <p className="text-2xl font-bold text-light-fg dark:text-dark-fg">
                    {form.views}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                    Created
                  </h3>
                  <p className="text-sm text-light-fg dark:text-dark-fg">
                    {format(new Date(form.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-light-fg-muted dark:text-dark-fg-muted mb-2">
                  Form URL
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-light-surface dark:bg-dark-surface rounded-lg text-sm font-mono"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-4 py-2 bg-light-surface dark:bg-dark-surface hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt rounded-lg transition-colors flex items-center gap-2"
                  >
                    <IoCopyOutline size={16} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-light-fg/10 dark:border-dark-fg/10 bg-light-surface/50 dark:bg-dark-surface/50 rounded-b-xl">
              <div className="flex flex-wrap gap-3">
                <PrimaryLink
                  title="Edit Form"
                  link={`dashboard/${user.dashboard}/forms/${form.formId}/edit
                  `}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                >
                  <MdEdit size={18} />
                  Edit Form
                </PrimaryLink>
                <SimpleLink
                  newWindow={true}
                  link={`/f/${form.formId}`}
                  title="Preview Form"
                  className="!w-fit bg-light-surface dark:bg-dark-surface"
                >
                  <IoEyeOutline size={18} />
                  Preview
                </SimpleLink>
                <SimpleLink
                  title="Submissions"
                  link={`/dashboard/${user.dashboard}/submissions/${form.formId}`}
                  className="!w-fit bg-light-surface dark:bg-dark-surface"
                >
                  <FaRegFileAlt size={16} />
                  Submissions
                </SimpleLink>
                <button
                  onClick={handleVisibility}
                  disabled={isTogglingVisibility}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-light-surface dark:bg-dark-surface hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MdPublic size={18} />
                  {isTogglingVisibility
                    ? "Processing..."
                    : form.status === "published"
                    ? "Unpublish"
                    : "Publish"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeletingForm}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MdDelete size={18} />
                  {isDeletingForm ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewPortal>
  );
}

export default FormDetailsModal;
