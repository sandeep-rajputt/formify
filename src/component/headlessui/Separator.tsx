import { memo } from "react";

import type { SeparatorProps } from "@/types";

function Separator({ className = "" }: SeparatorProps) {
  return (
    <div className={`my-1 h-px dark:bg-dark-fg/5 bg-light-fg/5 ${className}`} />
  );
}

export default memo(Separator);
