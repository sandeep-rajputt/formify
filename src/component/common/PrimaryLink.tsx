import React from "react";
import Link from "next/link";

function PrimaryLink({
  children,
  className,
  link,
  external = false,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  link: string;
  external?: boolean;
  title?: string;
}) {
  return (
    <Link
      href={external ? link : link.startsWith("/") ? link : `/${link}`}
      className={`flex bg-brand-primary text-white items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap ${className}`}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer nofollow" : undefined}
      title={title ? title : children?.toString()}
      aria-label={title ? title : children?.toString()}
    >
      {children}
    </Link>
  );
}

export default PrimaryLink;
