"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { FormId, ListField } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema } from "@/schema/formSchema";
import { updateListField } from "@/Store/slice/formSlice";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi2";
import { useState } from "react";
import type { RootState } from "@/Store/store";

interface ListFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function ListFieldSetting({ hide, id, formId }: ListFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state: RootState) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as ListField;

  const [items, setItems] = useState<string[]>(
    field?.items || ["List Item 1", "List Item 2"]
  );
  const [itemErrors, setItemErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      items: field?.items || ["List Item 1", "List Item 2"],
      ordered: field?.ordered,
    },
  });

  if (field?.value !== "list") {
    hide();
    return null;
  }

  function onSubmit(data: ListField) {
    const formData = { ...data, items };
    dispatch(updateListField({ data: formData, formId }));
    hide();
  }

  function validateItem(value: string): string | null {
    if (!value.trim()) {
      return "List item cannot be empty";
    }
    if (value.length > 100) {
      return "List item can't be more than 100 characters";
    }
    return null;
  }

  function addItem() {
    if (items.length >= 50) return;
    const newItems = [...items, `List Item ${items.length + 1}`];
    setItems(newItems);
    setValue("items", newItems);
    setItemErrors([...itemErrors, ""]);
  }

  function removeItem(index: number) {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      const newErrors = itemErrors.filter((_, i) => i !== index);
      setItems(newItems);
      setValue("items", newItems);
      setItemErrors(newErrors);
    }
  }

  function updateItem(index: number, value: string) {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    setValue("items", newItems);

    // Validate individual item
    const newErrors = [...itemErrors];
    const error = validateItem(value);
    newErrors[index] = error || "";
    setItemErrors(newErrors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextInput
          register={register("label")}
          label="List Title"
          error={errors.label?.message as string}
          placeholder="Enter list title"
          required
        />
        <HookSelectInput
          name="ordered"
          control={control}
          label="List Type"
          message="Choose between ordered (numbered) or unordered (bulleted) list"
          error={errors.ordered?.message}
          options={[
            { id: 1, name: "Unordered (Bullets)", value: false },
            { id: 2, name: "Ordered (Numbers)", value: true },
          ]}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">
              List Items ({items.length}/50)
            </label>
            <button
              type="button"
              onClick={addItem}
              disabled={items.length >= 50}
              className={`flex items-center gap-1 px-2 py-1 text-sm rounded ${
                items.length >= 50
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder="Enter list item (max 100 characters)"
                    maxLength={100}
                    className={`w-full border rounded-md focus:outline-none h-9 px-2 text-light-text/95 dark:text-dark-text/95 text-sm ${
                      itemErrors[index]
                        ? "border-red-500"
                        : "border-light-fg-muted/20 dark:border-dark-fg-muted/20"
                    }`}
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
              {itemErrors[index] && (
                <p className="text-red-500 text-xs ml-1">{itemErrors[index]}</p>
              )}
              <div className="text-xs text-gray-500 ml-1">
                {item.length}/100 characters
              </div>
            </div>
          ))}

          {errors.items && (
            <p className="text-red-500 text-sm">
              {errors.items.message || "At least one list item is required"}
            </p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 px-4 py-4 border-t border-light-fg/10 dark:border-dark-fg/10">
        <div className="flex justify-end gap-3">
          <button
            onClick={hide}
            className="px-4 py-2 text-sm border rounded-md border-light-fg/20 dark:border-dark-fg/20 hover:bg-light-fg/5 dark:hover:bg-dark-fg/5"
          >
            Cancel
          </button>
          <PrimarySquareButton>Save Settings</PrimarySquareButton>
        </div>
      </div>
    </form>
  );
}

export default ListFieldSetting;
