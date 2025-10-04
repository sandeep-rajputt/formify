import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const DraftDocumentIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
}) => {
  const iconSize = `${size}px`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Document outline */}
      <rect x="4" y="3" width="16" height="18" rx="2" ry="2" />

      {/* Draft text lines */}
      <path d="M8 9H12" />
      <path d="M8 13H16" />
      <path d="M8 17H11" />
    </svg>
  );
};

export default DraftDocumentIcon;
