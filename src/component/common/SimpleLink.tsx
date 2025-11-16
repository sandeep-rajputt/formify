import Link from "next/link";
import type { PrimaryLinkProps } from "@/types";

function SimpleLink({
  children,
  className,
  link,
  external = false,
  title,
  newWindow,
}: PrimaryLinkProps) {
  return (
    <Link
      href={external ? link : link.startsWith("/") ? link : `/${link}`}
      className={`w-full rounded-md hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors duration-100 text-[15px] font-normal tracking-wide flex items-center gap-1.5 py-2 px-3 ${className}`}
      target={external || newWindow ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer nofollow" : undefined}
      title={title ? title : children?.toString()}
      aria-label={title ? title : children?.toString()}
    >
      {children}
    </Link>
  );
}

export default SimpleLink;
