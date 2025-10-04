import React from "react";
import TivoraIcon from "@/component/svg/TivoraIcon";

function TivoraMessage({ message }: { message: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 my-2 px-3 py-2">
      <div>
        <TivoraIcon size={26} />
      </div>
      <div className="self-center">
        <p className="text-[15px] wrap-anywhere">{message}</p>
      </div>
    </div>
  );
}

export default TivoraMessage;
