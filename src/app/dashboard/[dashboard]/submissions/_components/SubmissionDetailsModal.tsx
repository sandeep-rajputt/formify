"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@/component/svg/CloseIcon";

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

interface SubmissionDetailsModalProps {
  submission: Submission;
  formTitle: string;
  onClose: () => void;
}

function SubmissionDetailsModal({
  submission,
  formTitle,
  onClose,
}: SubmissionDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) return "No answer";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-light-surface dark:bg-dark-surface p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-light-fg dark:text-dark-fg"
                  >
                    Submission Details
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-md p-2 hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
                  >
                    <CloseIcon size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Submission Info */}
                  <div className="bg-light-surface-alt dark:bg-dark-surface-alt rounded-lg p-4">
                    <h4 className="font-medium text-light-fg dark:text-dark-fg mb-3">
                      Submission Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-light-fg-muted dark:text-dark-fg-muted">
                          Form:
                        </span>
                        <div className="font-medium text-light-fg dark:text-dark-fg">
                          {formTitle}
                        </div>
                      </div>
                      <div>
                        <span className="text-light-fg-muted dark:text-dark-fg-muted">
                          Submitted:
                        </span>
                        <div className="font-medium text-light-fg dark:text-dark-fg">
                          {formatDate(submission.submittedAt)}
                        </div>
                      </div>
                      {submission.submitterInfo?.ipAddress && (
                        <div>
                          <span className="text-light-fg-muted dark:text-dark-fg-muted">
                            IP Address:
                          </span>
                          <div className="font-medium text-light-fg dark:text-dark-fg">
                            {submission.submitterInfo.ipAddress}
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-light-fg-muted dark:text-dark-fg-muted">
                          Submission ID:
                        </span>
                        <div className="font-mono text-xs text-light-fg dark:text-dark-fg">
                          {submission._id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answers */}
                  <div>
                    <h4 className="font-medium text-light-fg dark:text-dark-fg mb-3">
                      Answers
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(submission.answers).map(
                        ([fieldId, value]) => (
                          <div
                            key={fieldId}
                            className="bg-light-surface-alt dark:bg-dark-surface-alt rounded-lg p-4"
                          >
                            <div className="text-sm text-light-fg-muted dark:text-dark-fg-muted mb-1">
                              Field ID: {fieldId}
                            </div>
                            <div className="text-light-fg dark:text-dark-fg">
                              {typeof value === "string" &&
                              value.length > 100 ? (
                                <div className="whitespace-pre-wrap break-words">
                                  {formatValue(value)}
                                </div>
                              ) : (
                                <div className="break-words">
                                  {formatValue(value)}
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* User Agent Info */}
                  {submission.submitterInfo?.userAgent && (
                    <div className="bg-light-surface-alt dark:bg-dark-surface-alt rounded-lg p-4">
                      <h4 className="font-medium text-light-fg dark:text-dark-fg mb-2">
                        Browser Information
                      </h4>
                      <div className="text-sm text-light-fg-muted dark:text-dark-fg-muted break-all">
                        {submission.submitterInfo.userAgent}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SubmissionDetailsModal;
