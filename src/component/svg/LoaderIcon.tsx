import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const LoaderIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
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
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {/* Semi-circle arc (top half) */}
      <path d="M4 12a8 8 0 0 1 16 0" />
    </svg>
  );
};

export default LoaderIcon;
