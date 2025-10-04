import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const RefreshIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const iconSize = `${size}px`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circular arrow (clockwise) */}
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      {/* Arrow head (clockwise) */}
      <path d="M3 3v6h6" />
    </svg>
  );
};

export default RefreshIcon;
