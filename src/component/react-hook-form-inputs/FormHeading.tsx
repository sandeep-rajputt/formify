import type { HeadingField } from "@/types/form-types";
import { createElement } from "react";

interface FormHeadingProps {
  field: HeadingField;
  theme: "dark" | "light";
}

function FormHeading({ field, theme }: FormHeadingProps) {
  const { label, level } = field;

  const baseClasses = `font-bold ${
    theme === "dark" ? "!text-dark-fg" : "!text-light-fg"
  }`;

  const sizeClasses = {
    h1: "text-3xl",
    h2: "text-2xl",
    h3: "text-xl",
  };

  return createElement(
    level,
    { className: `${baseClasses} ${sizeClasses[level]}` },
    label
  );
}

export default FormHeading;
