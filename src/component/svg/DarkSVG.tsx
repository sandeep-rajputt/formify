import React from "react";

interface DarkSVGProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

const DarkSVG: React.FC<DarkSVGProps> = ({
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
      className={`stroke-[--color-foreground] rotate-130 ${className} z-0`}
      fill="none"
    >
      <path
        d="M19 12C19 16.97 14.97 21 10 21C8.77 21 7.61 20.74 6.57 20.27C9.78 19.1 12 15.84 12 12C12 8.16 9.78 4.9 6.57 3.73C7.61 3.26 8.77 3 10 3C14.97 3 19 7.03 19 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DarkSVG;
