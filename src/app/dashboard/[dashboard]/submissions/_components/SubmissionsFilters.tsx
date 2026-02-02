"use client";
import NewListbox, { FilterOptions } from "@/component/headlessui/NewListbox";
import ListBoxBtn from "@/component/headlessui/ListboxBtn";
import ListboxOpts from "@/component/headlessui/ListboxOpts";
import ListboxOptn from "@/component/headlessui/ListboxOptn";

interface Form {
  _id: string;
  formId: string;
  title: string;
  submissionsCount: number;
  status: "draft" | "published";
}

interface SubmissionsFiltersProps {
  forms: Form[];
  selectedFormId: string;
  onFormChange: (formId: string) => void;
}

function SubmissionsFilters({
  forms,
  selectedFormId,
  onFormChange,
}: SubmissionsFiltersProps) {
  const formOptions: FilterOptions[] = [
    { id: 0, name: "All Forms", value: "all" },
    ...forms.map((form, index) => ({
      id: index + 1,
      name: `${form.title} (${form.submissionsCount})`,
      value: form.formId,
    })),
  ];

  const selectedOption =
    formOptions.find((option) => option.value === selectedFormId) ||
    formOptions[0];

  const handleFormChange = (option: FilterOptions) => {
    if (option.value) {
      onFormChange(option.value);
    }
  };

  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-light-fg dark:text-dark-fg">
            Filter by form:
          </span>
          <div className="min-w-[200px]">
            <NewListbox
              selected={selectedOption}
              handleChange={handleFormChange}
            >
              <ListBoxBtn className="w-full">{selectedOption.name}</ListBoxBtn>
              <ListboxOpts>
                {formOptions.map((option) => (
                  <ListboxOptn
                    key={option.id}
                    data={option}
                    selected={selectedOption}
                  >
                    {option.name}
                  </ListboxOptn>
                ))}
              </ListboxOpts>
            </NewListbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsFilters;
