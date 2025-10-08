import React, { useRef } from "react";
import TivoraContainer from "./TivoraContainer";

function MobileTivora({ hide, formId }: { hide: () => void; formId: string }) {
  const Box = useRef<HTMLDivElement>(null);

  function handleOutterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (Box.current === e.target) {
      hide();
    }
  }

  return (
    <div className="fixed inset-0 z-5000 flex overflow-hidden w-full backdrop-blur-sm">
      <div
        className="relative flex w-full"
        onClick={handleOutterClick}
        ref={Box}
      >
        <div className="h-[90vh] mt-auto w-full">
          <TivoraContainer id={formId} height={"h-[100%]"} close={hide} />
        </div>
      </div>
    </div>
  );
}

export default MobileTivora;
