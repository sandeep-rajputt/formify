"use client";

import NewPortal from "@/component/common/NewPortal";
import dynamic from "next/dynamic";
import TivoraIcon from "@/component/svg/TivoraIcon";
import type { FormId } from "@/types/form-types";
import React, { useState } from "react";
import SpinnerIcon from "@/component/svg/SpinnerIcon";
import SimpleCard from "@/component/common/SimpleCard";

const DynamicMobileTivora = dynamic(
  () =>
    import(
      "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/MobileTivora"
    ),
  {
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <SpinnerIcon />
      </div>
    ),
  }
);

const DynamicTivoraContainer = dynamic(
  () =>
    import(
      "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraContainer"
    ),
  {
    loading: () => (
      <SimpleCard className="md:h-[calc(100dvh-120px)] h-[90vh] w-full flex items-center justify-center">
        <SpinnerIcon />
      </SimpleCard>
    ),
  }
);

const DynamicFormContainer = dynamic(
  () =>
    import(
      "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormContainer"
    ),
  {
    loading: () => (
      <SimpleCard className="h-[calc(100dvh-120px)] w-full flex items-center justify-center">
        <SpinnerIcon />
      </SimpleCard>
    ),
  }
);

function NewFormPageStructure({ chatFormId }: { chatFormId: FormId }) {
  const [showTivora, setShowTivora] = useState<boolean>(false);
  return (
    <div className="grid md:grid-cols-[1fr_320px] grid-cols-1 gap-5">
      <DynamicFormContainer formId={chatFormId} />
      <div className="md:flex hidden">
        <DynamicTivoraContainer id={chatFormId} />
      </div>
      <div className="md:hidden flex">
        <div className="fixed bottom-3 right-5 z-50 flex items-center justify-center rounded-md">
          <button
            className="cursor-pointer flex gap-1 items-center justify-center bg-light-bg dark:bg-dark-bg px-2 py-1 rounded-full border border-light-fg-muted/20 dark:border-dark-fg-muted/20"
            onClick={() => {
              setShowTivora((prev) => !prev);
            }}
          >
            <TivoraIcon size={25} />
            <span className=" font-semibold tracking-tightest">ASK AI</span>
          </button>
          <div className="md:hidden block">
            {showTivora && (
              <NewPortal>
                <DynamicMobileTivora
                  formId={chatFormId}
                  hide={() => setShowTivora(false)}
                />
              </NewPortal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewFormPageStructure;
