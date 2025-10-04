"use client";
import Separator from "@/component/headlessui/Separator";
import AddFormField from "@/app/dashboard/[dashboard]/forms/new/_components/Form/AddFormField";
import { memo, useRef, useState, useEffect, Fragment } from "react";
import { useAppSelector } from "@/hooks/reduxToolkit";
import FormDefaultScreen from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormDefaultScreen";
import FormHeader from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormHeader";
import NewPortal from "@/component/common/NewPortal";
import FormSettingModal from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormSettingModal";
import { TextField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/TextField";
import FieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FieldSetting";
import { LongTextField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/LongTextField";
import { EmailField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/EmailField";
import { NumberField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/NumberField";
import { FormFieldOptions } from "@/types/form-types";
import { DateField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/DateField";
import { FormInitialStateSchema } from "@/schema/formSchema";
import { CheckBoxField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/CheckBoxField";
import { SelectField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/SelectField";
import { HeadingField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/HeadingField";
import { ParagraphField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/ParagraphField";
import { DividerField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/DividerField";
import { ListField } from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/ListField";
import z from "zod";

function FormContainer() {
  const { fields, setting } = useAppSelector((state) => state.form);
  const [disableScroll, setDisableScroll] = useState<boolean>(false);
  const [scrollbarTakesSpace, setScrollbarTakesSpace] =
    useState<boolean>(false);
  const [fieldSetting, setFieldSetting] = useState<{
    show: boolean;
    id: null | string;
    info: null | FormFieldOptions;
  }>({ show: false, id: null, info: null });
  const container = useRef<HTMLDivElement>(null);
  const [showFormSetting, setShowFormSetting] = useState<boolean>(false);

  useEffect(() => {
    if (container.current) {
      const { offsetWidth, clientWidth } = container.current;
      setScrollbarTakesSpace(offsetWidth > clientWidth);
    }
  }, []);

  function handlePublish() {
    const data = { fields, setting };
    try {
      FormInitialStateSchema.parse(data);
      console.log("Form data is valid:", data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error);
        alert("Form data is invalid. Please check the fields.");
      } else {
        console.error("An unexpected error occurred during validation:", error);
      }
    }
  }

  return (
    <>
      <div className="bg-light-surface h-[calc(100dvh-120px)] overflow-hidden dark:bg-dark-surface-alt border border-light-fg/5 dark:border-dark-fg/5 rounded-xl grid grid-rows-[auto_1fr]">
        <div>
          <div>
            <FormHeader
              totalFields={fields.length}
              onPublish={() => handlePublish()}
              onDraft={() => {}}
              onEdit={() => setShowFormSetting(true)}
              onPreview={() => {}}
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
            />
          ) : (
            <div className="flex flex-col gap-2 my-10">
              {fields.length <= 50 && (
                <AddFormField
                  disableScroll={() => setDisableScroll(true)}
                  enableScroll={() => setDisableScroll(false)}
                  fieldIndex={0}
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
                        />

                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />

                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
                        />
                        {fields.length <= 50 && (
                          <AddFormField
                            disableScroll={() => setDisableScroll(true)}
                            enableScroll={() => setDisableScroll(false)}
                            fieldIndex={index + 1}
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
            <FormSettingModal hide={() => setShowFormSetting(false)} />
          </NewPortal>
        )}
        {fieldSetting.show && fieldSetting.id && fieldSetting.info && (
          <NewPortal>
            <FieldSetting
              id={fieldSetting.id}
              hide={() =>
                setFieldSetting({ show: false, id: null, info: null })
              }
              fieldInfo={fieldSetting.info}
            />
          </NewPortal>
        )}
      </div>
    </>
  );
}

export default memo(FormContainer);
