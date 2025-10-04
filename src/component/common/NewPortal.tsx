"use client";
import OverlayPortal from "@/component/common/OverlayPortal";

function NewPortal({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <OverlayPortal>
        <div className="absolute top-0 left-0 w-full h-screen z-[500000000000]">
          {children}
        </div>
      </OverlayPortal>
    </div>
  );
}

export default NewPortal;
