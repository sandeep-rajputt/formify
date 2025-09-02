import { memo } from "react";

function Separator({ className = "" }: { className?: string }) {
  return (
    <div className={`my-1 h-px dark:bg-dark-fg/5 bg-light-fg/5 ${className}`} />
  );
}

export default memo(Separator);
