import type { ParagraphField } from "@/types/form-types";

interface FormParagraphProps {
  field: ParagraphField;
  theme: "dark" | "light";
}

function FormParagraph({ field, theme }: FormParagraphProps) {
  const { content } = field;

  return (
    <p
      className={`${
        theme === "dark" ? "!text-dark-fg-muted" : "!text-light-fg-muted"
      } leading-relaxed`}
    >
      {content}
    </p>
  );
}

export default FormParagraph;
