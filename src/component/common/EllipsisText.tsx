import { memo } from "react";
import type { ClassNameAndChildrenProps } from "@/types";

function EllipsisText({ children, className = "" }: ClassNameAndChildrenProps) {
  return <span className={`truncate block ${className}`}>{children}</span>;
}

export default memo(EllipsisText);
