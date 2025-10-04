"use client";
import SimpleCard from "@/component/common/SimpleCard";
import PrimaryButton from "@/component/common/PrimarySquareButton";
import SecondaryButton from "@/component/common/SecondarySquareButton";
import { useState, useRef, useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import type { ConfirmationModalProps } from "@/types";

function ConfirmationModal({
  heading,
  children,
  handleCancel,
  handleConfirm,
  danger = false,
  cancelText = "Cancel",
  confirmText = "Confirm",
  className = "",
}: ConfirmationModalProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [showCancelBtn, setShowCancelBtn] = useState<boolean>(true);

  function handleCancelClick() {
    if (!clicked) {
      handleCancel();
    }
  }

  function handleConfirmClick() {
    if (!clicked) {
      setShowCancelBtn(false);
      setClicked(true);
      handleConfirm();
    }
  }

  function handleKeys(key: string) {
    if (key === "Escape") handleCancelClick();
    if (key === "Enter") handleConfirmClick();
  }

  useEffect(() => {
    divRef.current?.focus();
  }, []);

  return (
    <div
      tabIndex={0}
      autoFocus
      ref={divRef}
      onKeyDown={(e) => handleKeys(e.key)}
      onClick={handleCancelClick}
      className={`flex items-center justify-center h-full dark:bg-light-fg/50 bg-dark-fg/50 backdrop-blur-lg `}
    >
      <SimpleCard
        handleClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className={`max-w-md w-full mx-5 !bg-dark-fg dark:!bg-light-fg !backdrop-blur-none p-6 ${className}`}
      >
        <h4 className="font-semibold text-xl mb-2">{heading}</h4>
        <div className="text-light-fg-muted dark:text-dark-fg-muted">
          {children}
        </div>
        <div className="flex gap-3 mt-5 ml-auto w-fit">
          {showCancelBtn && (
            <SecondaryButton handleClick={handleCancelClick}>
              {cancelText}
            </SecondaryButton>
          )}
          <PrimaryButton
            className={`${danger && "!bg-warning"} ${clicked && "py-3"}`}
            title={confirmText}
            handleClick={() => {
              handleConfirmClick();
            }}
          >
            {clicked ? <VscLoading className="animate-spin" /> : confirmText}
          </PrimaryButton>
        </div>
      </SimpleCard>
    </div>
  );
}

export default ConfirmationModal;
