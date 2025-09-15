import * as React from "react";

interface IconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

const NotFoundIcon: React.FC<IconProps> = ({
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
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer circle (error boundary) */}
      <circle cx="12" cy="12" r="9" />

      {/* Slash (not found / error) */}
      <path d="M8 8L16 16" />
    </svg>
  );
};

export default NotFoundIcon;
