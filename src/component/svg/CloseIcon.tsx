import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const CloseIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const iconSize = `${size}px`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default CloseIcon;
