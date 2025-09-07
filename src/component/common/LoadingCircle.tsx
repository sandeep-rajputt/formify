import type { LoadingCircleProps } from "@/types";

function LoadingCircle({ className = "" }: LoadingCircleProps) {
  return (
    <div
      className={`w-5 rounded-full border-none bg-[length:600px_50px] h-5 bg-gradient-to-r from-light-fg/10 dark:from-dark-fg/30 via-dark-fg/15 dark:via-light-fg/10 dark:to-light-fg/30 to-light-fg/10 animate-line-loader-600 ${className}`}
    />
  );
}

export default LoadingCircle;
