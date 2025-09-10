import { SimpleCardProps } from "@/types";

function PrimaryCard({
  children,
  className = "",
  handleClick = () => {},
}: SimpleCardProps) {
  return (
    <div
      onClick={(e) => handleClick(e)}
      className={`rounded-xl bg-light-surface dark:bg-dark-surface dark:text-dark-fg text-light-fg p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default PrimaryCard;
