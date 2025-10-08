import React from "react";
import TivoraIcon from "@/component/svg/TivoraIcon";

function TivoraThinking() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 my-2 px-3 py-2">
      <div>
        <TivoraIcon size={26} />
      </div>
      <div className="flex gap-2 self-center">
        <p className="text-[15px]">Thinking</p>
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-light-fg-muted dark:bg-dark-fg-muted animate-bounce delay-0"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-light-fg-muted dark:bg-dark-fg-muted animate-bounce delay-150"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-light-fg-muted dark:bg-dark-fg-muted animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
}

export default TivoraThinking;
