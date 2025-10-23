"use client";
import SimpleCard from "@/component/common/SimpleCard";
import Separator from "@/component/headlessui/Separator";
import type { FormFields } from "@/types/form-types";
import type { SerializedForm } from "@/utils/serializeForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form components
import {
  HookTextInput,
  HookTextAreaInput,
  HookNumberInput,
  HookEmailInput,
  HookCheckBoxInput,
  HookSelectInput,
  HookDatePicker,
  FormHeading,
  FormParagraph,
  FormDivider,
  FormList,
} from "@/component/react-hook-form-inputs";

// get the user system theme, dark or light
function getUserSystemTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
}

// Create dynamic validation schema based on form fields
function createFormSchema(fields: FormFields[]) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "input") {
      switch (field.value) {
        case "text-input":
          let textSchema = z.string();
          if (field.required) {
            textSchema = textSchema.min(1, "This field is required");
          }
          if (field.regex) {
            textSchema = textSchema.regex(
              new RegExp(field.regex),
              field.regexErrorMessage || "Invalid format"
            );
          }
          schemaFields[field.id] = textSchema;
          break;

        case "long-text":
          let longTextSchema = z.string();
          if (field.required) {
            longTextSchema = longTextSchema.min(1, "This field is required");
          }
          if (field.regex) {
            longTextSchema = longTextSchema.regex(
              new RegExp(field.regex),
              field.regexErrorMessage || "Invalid format"
            );
          }
          schemaFields[field.id] = longTextSchema;
          break;

        case "number":
          let numberSchema = z.coerce.number();
          if (field.required) {
            numberSchema = numberSchema.min(
              field.min,
              `Minimum value is ${field.min}`
            );
          }
          if (field.max !== undefined) {
            numberSchema = numberSchema.max(
              field.max,
              `Maximum value is ${field.max}`
            );
          }
          schemaFields[field.id] = numberSchema;
          break;

        case "email":
          let emailSchema = z.string().email("Please enter a valid email");
          if (field.required) {
            emailSchema = emailSchema.min(1, "This field is required");
          }
          schemaFields[field.id] = emailSchema;
          break;

        case "date":
          let dateSchema = z.string();
          if (field.required) {
            dateSchema = dateSchema.min(1, "This field is required");
          }
          schemaFields[field.id] = dateSchema;
          break;

        case "checkbox":
          let checkboxSchema = z.boolean();
          if (field.required) {
            checkboxSchema = checkboxSchema.refine(
              (val) => val === true,
              field.errorMessage || "This field is required"
            );
          }
          schemaFields[field.id] = checkboxSchema;
          break;

        case "select":
          let selectSchema = z.string();
          if (field.required) {
            selectSchema = selectSchema.min(1, "Please select an option");
          }
          schemaFields[field.id] = selectSchema;
          break;
      }
    }
  });

  return z.object(schemaFields);
}

function ClientFormPage({ data }: { data: SerializedForm }) {
  const [theme, setTheme] = useState<"dark" | "light" | null>(
    data.theme !== "system" ? data.theme : null
  );
  const [submissionState, setSubmissionState] = useState<
    "form" | "success" | "error"
  >("form");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { title, description, fields } = data;

  // Create form schema and setup react-hook-form
  const formSchema = createFormSchema(fields);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (theme === null) {
      const userTheme = getUserSystemTheme();
      setTheme(userTheme);
    }
  }, [theme]);

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const onSubmit = async (formData: Record<string, unknown>) => {
    try {
      console.log("Form submitted:", formData);

      // Send form data to our API
      const response = await fetch(`/api/forms/${data.formId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: data.formId,
          answers: formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionState("success");
      } else {
        setErrorMessage(result.message || "Something went wrong");
        setSubmissionState("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
      setSubmissionState("error");
    }
  };

  const renderField = (field: FormFields) => {
    const key = field.id;

    // Style fields (non-input)
    if (field.type === "style") {
      switch (field.value) {
        case "heading":
          return <FormHeading key={key} field={field} theme={theme} />;
        case "paragraph":
          return <FormParagraph key={key} field={field} theme={theme} />;
        case "divider":
          return <FormDivider key={key} field={field} theme={theme} />;
        default:
          return null;
      }
    }

    // Input fields
    if (field.type === "input") {
      switch (field.value) {
        case "text-input":
          return (
            <HookTextInput
              key={key}
              register={register(field.id)}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              message={field.description}
              error={errors[field.id]?.message as string}
            />
          );

        case "long-text":
          return (
            <HookTextAreaInput
              key={key}
              register={register(field.id)}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              message={field.description}
              rows={4}
              error={errors[field.id]?.message as string}
            />
          );

        case "number":
          return (
            <HookNumberInput
              key={key}
              register={register(field.id)}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              message={field.description}
              min={field.min}
              max={field.max}
              error={errors[field.id]?.message as string}
            />
          );

        case "email":
          return (
            <HookEmailInput
              key={key}
              register={register(field.id)}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              message={field.description}
              error={errors[field.id]?.message as string}
            />
          );

        case "date":
          return (
            <HookDatePicker
              key={key}
              name={field.id as string}
              control={control}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              message={field.description}
              mode={field.mode}
              minDate={field.minDate ? new Date(field.minDate) : undefined}
              maxDate={field.maxDate ? new Date(field.maxDate) : undefined}
              weekStartsOn={field.weekStartsOn === "1" ? 1 : 0}
              error={errors[field.id]?.message as string}
            />
          );

        case "checkbox":
          return (
            <HookCheckBoxInput
              key={key}
              register={register(field.id)}
              label={field.label}
              required={field.required}
              message={field.description || ""}
              error={errors[field.id]?.message as string}
            />
          );

        case "select":
          return (
            <HookSelectInput
              key={key}
              name={field.id as string}
              control={control}
              label={field.label}
              required={field.required}
              message={field.description}
              options={field.options.map((opt, idx) => ({
                id: idx,
                name: opt.label,
                value: opt.id,
              }))}
              error={errors[field.id]?.message as string}
            />
          );

        case "list":
          return <FormList key={key} field={field} theme={theme} />;

        default:
          return null;
      }
    }

    return null;
  };

  // Success Screen Component
  const SuccessScreen = () => (
    <div className="text-center py-12">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
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
        <h2
          className={`text-2xl font-bold mb-2 ${
            theme === "dark" ? "!text-dark-fg" : "!text-light-fg"
          }`}
        >
          Thank You!
        </h2>
        <p
          className={`text-base ${
            theme === "dark" ? "!text-dark-fg-muted" : "!text-light-fg-muted"
          }`}
        >
          Your form has been submitted successfully. We&apos;ll get back to you
          soon.
        </p>
      </div>
      <button
        onClick={() => setSubmissionState("form")}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          theme === "dark"
            ? "!bg-dark-surface-alt hover:!bg-dark-fg/10 !text-dark-fg border border-dark-fg-muted/20"
            : "!bg-light-surface-alt hover:!bg-light-fg/10 !text-light-fg border border-light-fg-muted/20"
        }`}
      >
        Submit Another Response
      </button>
    </div>
  );

  // Error Screen Component
  const ErrorScreen = () => (
    <div className="text-center py-12">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
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
        <h2
          className={`text-2xl font-bold mb-2 ${
            theme === "dark" ? "!text-dark-fg" : "!text-light-fg"
          }`}
        >
          Submission Failed
        </h2>
        <p
          className={`text-base mb-4 ${
            theme === "dark" ? "!text-dark-fg-muted" : "!text-light-fg-muted"
          }`}
        >
          {errorMessage}
        </p>
      </div>
      <button
        onClick={() => setSubmissionState("form")}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          theme === "dark"
            ? "!bg-blue-600 hover:!bg-blue-700 !text-white"
            : "!bg-blue-500 hover:!bg-blue-600 !text-white"
        }`}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "!bg-dark-bg !text-dark-fg"
          : "!bg-light-bg !text-light-fg"
      }`}
    >
      <div className="pt-10 pb-10">
        <SimpleCard
          className={`max-w-2xl mx-auto ${
            theme === "dark" ? "!bg-dark-surface" : "!bg-light-surface"
          }`}
        >
          {/* Conditional Rendering based on submission state */}
          {submissionState === "success" && <SuccessScreen />}

          {submissionState === "error" && <ErrorScreen />}

          {submissionState === "form" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Form Header */}
              <div className="mb-6">
                <h1
                  className={`text-3xl font-bold mb-2 ${
                    theme === "dark" ? "!text-dark-fg" : "!text-light-fg"
                  }`}
                >
                  {title}
                </h1>
                {description && (
                  <p
                    className={`text-base ${
                      theme === "dark"
                        ? "!text-dark-fg-muted"
                        : "!text-light-fg-muted"
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="space-y-6 mt-6">
                {fields.map((field) => renderField(field))}
              </div>

              {/* Submit Button */}
              {fields.some((field) => field.type === "input") && (
                <div className="mt-8 pt-6 border-t border-light-fg-muted/20 dark:border-dark-fg-muted/20">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      theme === "dark"
                        ? "!bg-blue-600 hover:!bg-blue-700 !text-white disabled:!bg-gray-600"
                        : "!bg-blue-500 hover:!bg-blue-600 !text-white disabled:!bg-gray-400"
                    } disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Form"}
                  </button>
                </div>
              )}
            </form>
          )}
        </SimpleCard>
      </div>
    </div>
  );
}

export default ClientFormPage;
