import Image from "next/image";
import { PrimarySquareButtonProps } from "@/types";
import { VscLoading } from "react-icons/vsc";

interface AuthButton extends PrimarySquareButtonProps {
  loading?: boolean;
}

function GithubAuthButton({
  className = "",
  children,
  title = "",
  disabled = false,
  handleClick = () => {},
  loading = false,
}: AuthButton) {
  return (
    <button
      title={title || (children as string)}
      aria-label={title || (children as string)}
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-5 w-full bg-light-surface-alt rounded-md py-3 font-medium cursor-pointer border border-light-fg/10 dark:bg-dark-surface-alt dark:border-dark-fg/10 ${
        disabled
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer opacity-100"
      } ${className}`}
    >
      {loading ? (
        <VscLoading className="animate-spin" />
      ) : (
        <>
          <Image alt="google icon" src={"/github.svg"} width={20} height={20} />
          <p>{children}</p>
        </>
      )}
    </button>
  );
}

export default GithubAuthButton;
