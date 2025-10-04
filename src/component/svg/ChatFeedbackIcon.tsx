import * as React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

const ChatFeedbackIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => {
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
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5C4 4 5 3 6 3H18C19 3 20 4 20 5V15C20 16 19 17 18 17H8L4 21V5Z" />
    </svg>
  );
};

export default ChatFeedbackIcon;
