"use client";
import Separator from "@/component/headlessui/Separator";
import ChatFeedbackIcon from "@/component/svg/ChatFeedbackIcon";
import RefreshIcon from "@/component/svg/RefreshIcon";
import TivoraIcon from "@/component/svg/TivoraIcon";
import SendIcon from "@/component/svg/SendIcon";
import LoaderIcon from "@/component/svg/LoaderIcon";
import TivoraMessage from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraMessage";
import { memo, useState } from "react";
import TivoraDefaultScreen from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraDefaultScreen";
import NewPortal from "@/component/common/NewPortal";
import ConfirmationModal from "@/component/common/ConfirmationModal";
import TivoraFeedback from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraFeedback";

function TivoraContainer() {
  const [sendBtn, setSendBtn] = useState<boolean>(true);
  const [showTivoraReset, setShowTivoraReset] = useState<boolean>(false);
  const [showTivoraFeedback, setShowTivoraFeedback] = useState<boolean>(false);

  function confirmTivoraReset() {
    setTimeout(() => {
      setShowTivoraReset(false);
    }, 2000);
  }

  function cancelTivoraReset() {
    setShowTivoraReset(false);
  }

  function setFeedbackvalue(val: number) {
    console.log(val);
  }

  return (
    <>
      <div className="bg-light-surface md:h-[calc(100dvh-120px)] h-[90vh] overflow-hidden w-full dark:bg-dark-surface-alt border border-light-fg/5 dark:border-dark-fg/5 rounded-xl grid grid-rows-[auto_1fr_auto]">
        <div>
          <div className="flex justify-between items-center pt-3 pb-2 pl-2 pr-3">
            <div className="flex items-center gap-1">
              <TivoraIcon size={30} />
              <h4 className="font-semibold text-lg">Tivora AI</h4>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setShowTivoraFeedback(true)}
                className="text-2xl cursor-pointer relative p-1.5 rounded hover:bg-light-fg-muted/10 hover:dark:bg-dark-fg-muted/10 hover:after:content-['Feedback'] after:text-nowrap after:text-sm after:absolute after:top-10 after:bg-light-surface-alt hover:after:px-3 hover:after:py-2 dark:after:bg-dark-surface-alt after:right-0 hover:after:border after:border-light-fg-muted dark:after:border-dark-fg-muted after:rounded"
              >
                <ChatFeedbackIcon size={20} />
              </button>
              <button
                onClick={() => setShowTivoraReset(true)}
                className="text-2xl cursor-pointer relative p-1.5 rounded hover:bg-light-fg-muted/10 hover:dark:bg-dark-fg-muted/10 hover:after:content-['Restart_AI'] after:text-nowrap after:text-sm after:absolute after:top-10 after:bg-light-surface-alt hover:after:px-3 hover:after:py-2 dark:after:bg-dark-surface-alt after:right-0 hover:after:border after:border-light-fg-muted dark:after:border-dark-fg-muted after:rounded"
              >
                <RefreshIcon size={20} />
              </button>
            </div>
          </div>
          <Separator className="mb-0" />
        </div>
        <div className="overflow-y-scroll h-full scrollbar">
          <TivoraMessage message="👋 Hello! I’m Tivora, your AI assistant. Need help building your form?" />
          <TivoraDefaultScreen />
        </div>
        <div className="w-full px-2 pt-1 flex flex-col gap-1">
          <div className="px-4 flex gap-2 py-2 border rounded-full border-light-fg/10 dark:border-dark-fg/10">
            <input type="text" className="w-full focus:outline-none" />
            {sendBtn ? (
              <button
                className="cursor-pointer opacity-80 rotate-45"
                onClick={() => {
                  setSendBtn(false);
                }}
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
      {showTivoraReset && (
        <NewPortal>
          <ConfirmationModal
            heading="Reset Tivora AI"
            handleCancel={cancelTivoraReset}
            danger={true}
            handleConfirm={confirmTivoraReset}
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
            setFeedbackvalue={setFeedbackvalue}
          />
        </NewPortal>
      )}
    </>
  );
}

export default memo(TivoraContainer);
