"use client";

import Separator from "@/component/headlessui/Separator";
import React, { useEffect, useRef } from "react";
import ChatFeedbackIcon from "@/component/svg/ChatFeedbackIcon";
import RefreshIcon from "@/component/svg/RefreshIcon";
import TivoraIcon from "@/component/svg/TivoraIcon";
import SendIcon from "@/component/svg/SendIcon";
import LoaderIcon from "@/component/svg/LoaderIcon";
import TivoraMessage from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraMessage";
import TivoraDefaultScreen from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraDefaultScreen";
import TivoraUserMessage from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraMessage";
import NewPortal from "@/component/common/NewPortal";
import ConfirmationModal from "@/component/common/ConfirmationModal";
import TivoraFeedback from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraFeedback";
import TivoraThinking from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraThinking";

import { memo, useState } from "react";
import runGemini from "@/lib/gemini";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxToolkit";
import {
  addUserChat,
  addModelChat,
  updateFields,
  updateForm,
  updateFormSetting,
  addField,
  deleteField,
  updateField,
  addFieldAfter,
  moveField,
  addFieldBefore,
  clearChat,
} from "@/Store/slice/formSlice";
import type {
  FormId,
  tivoraAiResponseSystem,
  TivoraAiResponse,
} from "@/types/form-types";
import CloseIcon from "@/component/svg/CloseIcon";

function addFieldsToForm(
  system: tivoraAiResponseSystem,
  formId: FormId,
  dispatch: ReturnType<typeof useAppDispatch>
) {
  if (!system) return;
  if (system.form) {
    dispatch(updateForm({ formId, data: system.form }));
  }

  if (system.formFields) {
    dispatch(updateFields({ formId, data: system.formFields }));
  }

  if (system.formSetting) {
    dispatch(updateFormSetting({ formId, data: system.formSetting }));
  }

  if (system.addField) {
    const { addField: newFields } = system;
    newFields.map((item) => {
      dispatch(addField({ formId, index: item.index, data: item.data }));
    });
  }

  if (system.remove) {
    system.remove.map((id) => {
      dispatch(deleteField({ formId, id }));
    });
  }

  if (system.updateField) {
    const { updateField: fields } = system;
    fields.map((item) => {
      dispatch(updateField({ formId, data: item }));
    });
  }

  if (system.addFieldAfter) {
    const { addFieldAfter: fields } = system;
    fields.map((item) => {
      dispatch(
        addFieldAfter({ formId, afterId: item.afterId, data: item.data })
      );
    });
  }

  if (system.addFieldBefore) {
    const { addFieldBefore: fields } = system;
    fields.map((item) => {
      dispatch(
        addFieldBefore({ formId, beforeId: item.beforeId, data: item.data })
      );
    });
  }

  if (system.moveField) {
    const { moveField: fields } = system;
    fields.map((item) => {
      dispatch(moveField({ formId, id: item.id, newIndex: item.newIndex }));
    });
  }
}

function TivoraContainer({
  id,
  height,
  close,
}: {
  id: FormId;
  height?: string;
  close?: () => void;
}) {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form.find((f) => f.id === id));
  const conversationRef = useRef<HTMLDivElement>(null);

  const [showTivoraReset, setShowTivoraReset] = useState(false);
  const [showTivoraFeedback, setShowTivoraFeedback] = useState(false);
  const [value, setValue] = useState("");
  const [sendBtn, setSendBtn] = useState(
    form?.conversation[form?.conversation.length - 1].role === "user"
      ? false
      : true
  );

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [form?.conversation]);

  if (!form) return null;

  const confirmTivoraReset = () => {
    dispatch(clearChat(id));
    setShowTivoraReset(false);
  };
  const cancelTivoraReset = () => setShowTivoraReset(false);

  const setFeedbackValue = (val: number) => console.log("Feedback:", val);

  const runQuery = (query: string) => handleSubmit(query);

  const handleSubmit = async (msg: string) => {
    const trimmed = msg.trim();
    if (!trimmed) return;

    setValue("");
    setSendBtn(false);
    dispatch(addUserChat({ text: trimmed, formId: id }));
    const response: TivoraAiResponse = await runGemini(
      [...form.conversation, { role: "user", parts: [{ text: trimmed }] }],
      { fields: form.fields, setting: form.setting }
    );

    if (response.system) {
      addFieldsToForm(response.system, id, dispatch);
      if (close) {
        setTimeout(() => close(), 1000);
      }
    }
    dispatch(addModelChat({ text: JSON.stringify(response), formId: id }));

    setSendBtn(true);
  };

  const parsedMessage = JSON.parse(form.conversation[0].parts[0].text);
  return (
    <>
      <div
        className={`bg-light-surface ${
          height ? height : "md:h-[calc(100dvh-120px)] h-[90vh]"
        } overflow-hidden w-full dark:bg-dark-surface-alt border border-light-fg/5 dark:border-dark-fg/5 rounded-xl grid grid-rows-[auto_1fr_auto]`}
      >
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pt-3 pb-2 pl-2 pr-3">
            <div className="flex items-center gap-1">
              <TivoraIcon size={30} />
              <h4 className="font-semibold text-lg">Tivora AI</h4>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setShowTivoraFeedback(true)}
                className="text-2xl cursor-pointer relative p-1.5 rounded hover:bg-light-fg-muted/10 hover:dark:bg-dark-fg-muted/10"
              >
                <ChatFeedbackIcon size={20} />
              </button>
              <button
                onClick={() => setShowTivoraReset(true)}
                className="text-2xl cursor-pointer relative p-1.5 rounded hover:bg-light-fg-muted/10 hover:dark:bg-dark-fg-muted/10"
              >
                <RefreshIcon size={20} />
              </button>
              {close && (
                <button
                  onClick={() => close()}
                  className="text-2xl cursor-pointer relative p-1.5 rounded hover:bg-light-fg-muted/10 hover:dark:bg-dark-fg-muted/10"
                >
                  <CloseIcon size={20} />
                </button>
              )}
            </div>
          </div>
          <Separator className="mb-0" />
        </div>

        {/* Conversation */}
        <div
          ref={conversationRef}
          className="overflow-y-scroll h-full scrollbar px-1"
        >
          <TivoraUserMessage message={parsedMessage.userMessage} />
          {form.conversation.length === 1 && (
            <TivoraDefaultScreen runQuery={runQuery} />
          )}
          {form.conversation.map((item, index) => {
            if (index === 0) return null;

            if (item.role === "user") {
              if (form.conversation.length - 1 === index) {
                return (
                  <React.Fragment key={index}>
                    <div
                      key={index}
                      className="bg-light-fg-muted/5 dark:bg-dark-fg-muted/5 rounded-md"
                    >
                      <TivoraUserMessage message={item.parts[0].text} />
                    </div>
                    <TivoraThinking />
                  </React.Fragment>
                );
              }
              return (
                <div
                  key={index}
                  className="bg-light-fg-muted/5 dark:bg-dark-fg-muted/5 rounded-md"
                >
                  <TivoraUserMessage message={item.parts[0].text} />
                </div>
              );
            }

            if (item.role === "model") {
              try {
                const parsed = JSON.parse(item.parts[0].text);
                if (parsed.userMessage) {
                  return (
                    <TivoraMessage key={index} message={parsed.userMessage} />
                  );
                }
              } catch (err) {
                console.error("Invalid model message JSON:", err);
              }
            }

            return null;
          })}
        </div>

        {/* Input */}
        <div className="w-full px-2 pt-1 flex flex-col gap-1">
          <div className="px-4 flex gap-2 py-2 border rounded-full border-light-fg/10 dark:border-dark-fg/10">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(value)}
              disabled={!sendBtn}
              placeholder="Message Tivora AI"
              className="w-full focus:outline-none placeholder:text-light-fg-muted/50 dark:placeholder:text-dark-fg-muted/50"
            />
            {sendBtn ? (
              <button
                onClick={() => handleSubmit(value)}
                className="cursor-pointer opacity-80 rotate-45"
              >
                <SendIcon size={20} />
              </button>
            ) : (
              <div className="flex items-center justify-center">
                <LoaderIcon className="animate-spin opacity-70" />
              </div>
            )}
          </div>
          <p className="dark:text-dark-fg/60 text-light-fg/60 text-xs text-center">
            AI may produce inaccurate information
          </p>
        </div>
      </div>

      {/* Modals */}
      {showTivoraReset && (
        <NewPortal>
          <ConfirmationModal
            heading="Reset Tivora AI"
            handleCancel={cancelTivoraReset}
            handleConfirm={confirmTivoraReset}
            danger
          >
            <p>
              Are you sure you want to reset Tivora AI? This will clear all the
              conversation.
            </p>
          </ConfirmationModal>
        </NewPortal>
      )}

      {showTivoraFeedback && (
        <NewPortal>
          <TivoraFeedback
            hide={() => setShowTivoraFeedback(false)}
            setFeedbackvalue={setFeedbackValue}
          />
        </NewPortal>
      )}
    </>
  );
}

export default memo(TivoraContainer);
