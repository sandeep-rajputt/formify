import * as React from "react";

interface IconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

const OppositeMenuIcon: React.FC<IconProps> = ({
  className,
  size,
  width,
  height,
  color,
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
      className={className}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6H12" />
      <path d="M4 12H18" />
      <path d="M10 18H20" />
    </svg>
  );
};

export default OppositeMenuIcon;
