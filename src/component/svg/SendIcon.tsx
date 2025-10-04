import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const SendIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
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
      {/* Paper plane */}
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
};

export default SendIcon;
