import React from "react";

interface MonitorSVGProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

const MonitorSVG: React.FC<MonitorSVGProps> = ({
  className,
  size,
  width,
  height,
}) => {
  const iconSize = size ? `${size}px` : undefined;
  const iconWidth = width ? `${width}px` : iconSize || "24px";
  const iconHeight = height ? `${height}px` : iconSize || "24px";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconWidth}
      height={iconHeight}
      className={`stroke-[--color-foreground] ${className}`}
      fill="none"
    >
      <path
        d="M6.44 2H17.55C21.11 2 22 2.89 22 6.44V12.77C22 16.33 21.11 17.21 17.56 17.21H6.44C2.89 17.22 2 16.33 2 12.78V6.44C2 2.89 2.89 2 6.44 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.22V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 13H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 22H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MonitorSVG;
