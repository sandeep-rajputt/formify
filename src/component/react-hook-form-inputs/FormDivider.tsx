import type { DividerField } from "@/types/form-types";

interface FormDividerProps {
  field: DividerField;
  theme: "dark" | "light";
}

function FormDivider({ field, theme }: FormDividerProps) {
  const { height, spaceTop, spaceBottom } = field;

  return (
    <div
      className={`w-full`}
      style={{
        marginTop: `${spaceTop}px`,
        marginBottom: `${spaceBottom}px`,
      }}
    >
      <hr
        className={`border-0 ${
          theme === "dark" ? "!bg-dark-fg-muted/30" : "!bg-light-fg-muted/30"
        }`}
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

export default FormDivider;
