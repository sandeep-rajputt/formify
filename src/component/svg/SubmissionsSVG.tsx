import React from "react";

interface SubmissionsSVGProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

const SubmissionsSVG: React.FC<SubmissionsSVGProps> = ({
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
      <polyline
        points="22 12 16 12 14 15 10 15 8 12 2 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SubmissionsSVG;
