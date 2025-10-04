import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const EditIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
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
      {/* Pencil inside square */}
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
      <path d="M20.586 5.586a2 2 0 00-2.828-2.828L9 11.586V15h3.414l8.172-8.172z" />
    </svg>
  );
};

export default EditIcon;
