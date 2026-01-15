"use client";
import Separator from "@/component/headlessui/Separator";
import AddFormField from "@/app/dashboard/[dashboard]/forms/new/_components/Form/AddFormField";
import { memo, useRef, useState, useEffect, Fragment } from "react";
import { useAppSelector } from "@/hooks/reduxToolkit";
import Link from "next/link";
import FormDefaultScreen from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormDefaultScreen";
import FormHeader from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormHeader";
import NewPortal from "@/component/common/NewPortal";
import FormSettingModal from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormSettingModal";
import { TextField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/TextField";
import FieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FieldSetting";
import { LongTextField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/LongTextField";
import { EmailField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/EmailField";
import { NumberField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/NumberField";
import { FormFieldOptions, FormId } from "@/types/form-types";
import { DateField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/DateField";
import { FormSchema } from "@/schema/formSchema";
import { resetForm } from "@/Store/slice/formSlice";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { CheckBoxField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/CheckBoxField";
import { SelectField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/SelectField";
import { HeadingField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/HeadingField";
import { ParagraphField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/ParagraphField";
import { DividerField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/DividerField";
import { ListField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/ListField";
import ConfirmationModal from "@/component/common/ConfirmationModal";
import z from "zod";

function FormContainer({ formId }: { formId: FormId }) {
  const dispatch = useAppDispatch();
  const { fields, setting, conversation } = useAppSelector((state) => {
    const form = state.form.find((form) => form.id === formId);
    return form
      ? form
      : { fields: undefined, setting: undefined, conversation: undefined };
  });
  const [disableScroll, setDisableScroll] = useState<boolean>(false);
  const [scrollbarTakesSpace, setScrollbarTakesSpace] =
    useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const [fieldSetting, setFieldSetting] = useState<{
    show: boolean;
    id: null | string;
    info: null | FormFieldOptions;
  }>({ show: false, id: null, info: null });
  const container = useRef<HTMLDivElement>(null);
  const [showFormSetting, setShowFormSetting] = useState<boolean>(false);

  // Simple popup state for publish results
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [newFormId, setNewFormId] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [confirmPublishModel, setConfirmPublishModel] = useState<
    null | "Publish" | "Update" | "Draft"
  >(null);

  // Copy link function
  const copyFormLink = async () => {
    const formUrl = `${window.location.origin}/f/${newFormId}`;
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    if (container.current) {
      const { offsetWidth, clientWidth } = container.current;
      setScrollbarTakesSpace(offsetWidth > clientWidth);
    }
  }, []);

  function handlePublish(status: "draft" | "publish" | "update") {
    if (!fields || fields.length < 2) {
      setConfirmPublishModel(null);
      setPopupType("error");
      setPopupMessage(
        "Your form must have at least 2 fields before publishing."
      );

      setIsPublishing(false);
      setIsDrafting(false);
      setShowPopup(true);
      return;
    }

    const data = { fields, setting, id: formId, conversation };

    if (status === "draft") {
      setIsDrafting(true);
    } else {
      setIsPublishing(true);
    }
    try {
      FormSchema.parse(data);
      console.log(data);
      const endpoint =
        formId === "new-form"
          ? "/api/forms/add-new-form"
          : `/api/forms/${formId}/update`;
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
      const API_URL = APP_URL + endpoint;
      fetch(API_URL, {
        method: formId === "new-form" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            fields: data.fields,
            setting: data.setting,
          },
          status: status === "draft" ? "draft" : "published",
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.id) {
            setNewFormId(result.id);
          }
          if (result.status === 200) {
            setPopupType("success");
            setPopupMessage(
              status === "publish"
                ? "Form published successfully! 🎉"
                : status === "draft"
                ? "Form saved as draft! 📝"
                : "Form updated successfully! 🎉"
            );
          } else {
            setPopupType("error");
            setPopupMessage("Something went wrong. Please try again.");
          }

          setShowPopup(true);
          if (formId === "new-form") {
            dispatch(resetForm());
          }
        })
        .catch((error) => {
          console.error(error);
          setPopupType("error");
          setPopupMessage("Failed to save form. Please check your connection.");
          setShowPopup(true);
        })
        .finally(() => {
          setConfirmPublishModel(null);
          setIsPublishing(false);
          setIsDrafting(false);
        });
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        setPopupType("error");
        if (error.issues[0].message) {
          setPopupMessage(error.issues[0].message);
        } else {
          setPopupMessage("Form data is invalid. Please check the fields.");
        }
        setShowPopup(true);
      } else {
        console.error("An unexpected error occurred during validation:", error);
        setPopupType("error");
        console.log(error);
        setPopupMessage("Something went wrong. Please try again.");
        setShowPopup(true);
      }
      setConfirmPublishModel(null);
      setIsPublishing(false);
      setIsDrafting(false);
    }
  }

  if (fields === undefined && setting === undefined) {
    return;
  }

  return (
    <>
      <div className="bg-light-surface h-[calc(100dvh-120px)] overflow-hidden dark:bg-dark-surface-alt border border-light-fg/5 dark:border-dark-fg/5 rounded-xl grid grid-rows-[auto_1fr]">
        <div>
          <div>
            <FormHeader
              update={formId === "new-form" ? false : true}
              totalFields={fields.length}
              isPublishing={isPublishing}
              isDrafting={isDrafting}
              onPublish={() => {
                setIsPublishing(true);
                setConfirmPublishModel(
                  formId === "new-form" ? "Publish" : "Update"
                );
              }}
              onDraft={() => {
                setIsDrafting(true);
                setConfirmPublishModel("Draft");
              }}
              onEdit={() => setShowFormSetting(true)}
            />
          </div>
          <Separator className="!my-0" />
        </div>
        <div
          ref={container}
          className={`h-full px-4 scrollbar ${
            disableScroll
              ? `!overflow-hidden ${scrollbarTakesSpace ? "!pr-[26px]" : ""}`
              : "!overflow-y-scroll"
          }`}
        >
          <div className="pt-5">
            <h3
              className="wrap-anywhere"
              onClick={() => setShowFormSetting(true)}
            >
              {setting.formName}
            </h3>
            <Separator />
            {setting.formDescription ? (
              <h5
                className="text-light-fg-muted wrap-anywhere dark:text-dark-fg-muted"
                onClick={() => setShowFormSetting(true)}
              >
                {setting.formDescription}
              </h5>
            ) : (
              <p
                className="text-light-fg-muted/50 dark:text-dark-fg-muted/50"
                onClick={() => setShowFormSetting(true)}
              >
                Form description here..
              </p>
            )}
          </div>
          {fields.length === 0 ? (
            <FormDefaultScreen
              disableScroll={() => setDisableScroll(true)}
              enableScroll={() => setDisableScroll(false)}
              formId={formId}
            />
          ) : (
            <div className="flex flex-col gap-2 my-10">
              {fields.length < 50 && (
                <AddFormField
                  disableScroll={() => setDisableScroll(true)}
                  enableScroll={() => setDisableScroll(false)}
                  fieldIndex={0}
                  formId={formId}
                />
              )}
              <div className="flex flex-col gap-5">
                {fields.map((item, index) => {
                  if (item.value === "text-input") {
                    return (
                      <Fragment key={item.id}>
                        <TextField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          placeholder={item.placeholder}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          formId={formId}
                        />

                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "long-text") {
                    return (
                      <Fragment key={item.id}>
                        <LongTextField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          placeholder={item.placeholder}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          formId={formId}
                        />

                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "number") {
                    return (
                      <Fragment key={item.id}>
                        <NumberField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          placeholder={item.placeholder}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          min={item.min}
                          max={item.max}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "email") {
                    return (
                      <Fragment key={item.id}>
                        <EmailField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          placeholder={item.placeholder}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "date") {
                    return (
                      <Fragment key={item.id}>
                        <DateField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          placeholder={item.placeholder}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          mode={item.mode}
                          minDate={item.minDate}
                          maxDate={item.maxDate}
                          weekStartsOn={item.weekStartsOn}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "checkbox") {
                    return (
                      <Fragment key={item.id}>
                        <CheckBoxField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "select") {
                    return (
                      <Fragment key={item.id}>
                        <SelectField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          label={item.label}
                          required={item.required}
                          description={item.description}
                          options={item.options}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "heading") {
                    return (
                      <Fragment key={item.id}>
                        <HeadingField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          label={item.label}
                          level={item.level}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "paragraph") {
                    return (
                      <Fragment key={item.id}>
                        <ParagraphField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          content={item.content}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "divider") {
                    return (
                      <Fragment key={item.id}>
                        <DividerField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          height={item.height}
                          spaceTop={item.spaceTop}
                          spaceBottom={item.spaceBottom}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  } else if (item.value === "list") {
                    return (
                      <Fragment key={item.id}>
                        <ListField
                          setFieldSetting={() =>
                            setFieldSetting({
                              show: true,
                              id: item.id,
                              info: {
                                name: item.name,
                                value: item.value,
                                type: item.type,
                              },
                            })
                          }
                          totalFields={fields.length}
                          index={index}
                          id={item.id}
                          label={item.label}
                          items={item.items}
                          ordered={item.ordered}
                          formId={formId}
                        />
                        {fields.length < 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
                            formId={formId}
                          />
                        )}
                      </Fragment>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
        {showFormSetting && (
          <NewPortal>
            <FormSettingModal
              hide={() => setShowFormSetting(false)}
              formId={formId}
            />
          </NewPortal>
        )}
        {fieldSetting.show && fieldSetting.id && fieldSetting.info && (
          <NewPortal>
            <FieldSetting
              id={fieldSetting.id}
              formId={formId}
              hide={() =>
                setFieldSetting({ show: false, id: null, info: null })
              }
              fieldInfo={fieldSetting.info}
            />
          </NewPortal>
        )}

        {/* Enhanced Popup for Publish Results */}
        {showPopup && (
          <NewPortal>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                  {popupType === "success" ? (
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-light-fg dark:text-dark-fg mb-2">
                    {popupType === "success" ? "Success!" : "Error"}
                  </h3>
                  <p className="text-light-fg-muted dark:text-dark-fg-muted">
                    {popupMessage}
                  </p>
                </div>

                {/* Success Actions */}
                {popupType === "success" && newFormId && (
                  <div className="space-y-3 mb-6">
                    {/* Form Link Display */}
                    <div className="bg-light-surface-alt dark:bg-dark-surface-alt rounded-lg p-3">
                      <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted mb-2">
                        Form Link:
                      </p>
                      <p className="text-sm text-light-fg dark:text-dark-fg font-mono break-all">
                        {`${
                          typeof window !== "undefined"
                            ? window.location.origin
                            : ""
                        }/f/${newFormId}`}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={copyFormLink}
                        className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-light-fg dark:text-dark-fg rounded-lg transition-colors text-sm"
                      >
                        {copySuccess ? (
                          <>
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy Link
                          </>
                        )}
                      </button>

                      <Link
                        href={`/f/${newFormId}`}
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        View Form
                      </Link>
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setCopySuccess(false);
                  }}
                  className="w-full py-3 px-4 bg-light-surface-alt hover:bg-light-fg/10 dark:bg-dark-surface-alt dark:hover:bg-dark-fg/10 text-light-fg dark:text-dark-fg rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </NewPortal>
        )}
        {confirmPublishModel && (
          <NewPortal>
            <ConfirmationModal
              heading={`${confirmPublishModel} Confirmation`}
              handleCancel={() => setConfirmPublishModel(null)}
              handleConfirm={() =>
                handlePublish(
                  confirmPublishModel.toLocaleLowerCase() as
                    | "draft"
                    | "publish"
                    | "update"
                )
              }
            >
              Are you sure you want to {confirmPublishModel.toLocaleLowerCase()}{" "}
              this form?
            </ConfirmationModal>
          </NewPortal>
        )}
      </div>
    </>
  );
}

export default memo(FormContainer);
