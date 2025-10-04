import type { FormFieldOptions, FormFields } from "@/types/form-types";
import { v4 as uuidv4 } from "uuid";

function addPropertyInField(data: FormFieldOptions): FormFields | undefined {
  if (data.value === "text-input") {
    return {
      ...data,
      id: uuidv4(),
      label: "Label",
      description: undefined,
      placeholder: "Enter your value",
      required: false,
      regex: undefined,
      regexErrorMessage: undefined,
    };
  } else if (data.value === "long-text") {
    return {
      ...data,
      id: uuidv4(),
      label: "Long Text",
      placeholder: "Enter your value",
      description: undefined,
      required: false,
      regex: undefined,
      regexErrorMessage: undefined,
    };
  } else if (data.value === "number") {
    return {
      ...data,
      id: uuidv4(),
      label: "Number",
      placeholder: "Enter your value",
      description: undefined,
      required: false,
      min: 0,
      max: 9007199254740991,
    };
  } else if (data.value === "email") {
    return {
      ...data,
      id: uuidv4(),
      label: "Email",
      placeholder: "Enter your email",
      description: undefined,
      required: false,
    };
  } else if (data.value === "date") {
    return {
      ...data,
      id: uuidv4(),
      label: "Date",
      placeholder: "Select a date",
      description: undefined,
      required: false,
      mode: "single",
      minDate: undefined,
      maxDate: undefined,
      weekStartsOn: "0",
    };
  } else if (data.value === "checkbox") {
    return {
      ...data,
      id: uuidv4(),
      label: undefined,
      description: "Description",
      defaultValue: false,
      errorMessage: "This field is required",
      required: false,
    };
  } else if (data.value === "select") {
    return {
      ...data,
      id: uuidv4(),
      label: "Select",
      description: undefined,
      required: false,
      options: [
        { label: "Option 1", id: uuidv4() },
        { label: "Option 2", id: uuidv4() },
      ],
    };
  } else if (data.value === "heading") {
    return {
      ...data,
      id: uuidv4(),

      label: "Heading",
      level: "h1",
    };
  } else if (data.value === "paragraph") {
    return {
      ...data,
      id: uuidv4(),
      content: "Paragraph",
    };
  } else if (data.value === "divider") {
    return {
      ...data,
      id: uuidv4(),
      height: "1",
      spaceBottom: "5",
      spaceTop: "5",
    };
  } else if (data.value === "list") {
    return {
      ...data,
      id: uuidv4(),
      label: "List",
      items: ["List Item 1", "List Item 2"],
      ordered: false,
    };
  }
  return undefined;
}

export default addPropertyInField;
