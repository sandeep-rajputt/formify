import type { ListField } from "@/types/form-types";

interface FormListProps {
  field: ListField;
  theme: "dark" | "light";
}

function FormList({ field, theme }: FormListProps) {
  const { label, items, ordered } = field;

  const ListTag = ordered ? "ol" : "ul";

  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-[13px] font-medium ${
          theme === "dark" ? "!text-dark-fg" : "!text-light-fg"
        }`}
      >
        {label}
      </label>
      <ListTag
        className={`${
          ordered ? "list-decimal" : "list-disc"
        } list-inside space-y-1 ${
          theme === "dark" ? "!text-dark-fg-muted" : "!text-light-fg-muted"
        }`}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}

export default FormList;
