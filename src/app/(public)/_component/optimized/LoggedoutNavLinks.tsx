import { memo } from "react";
import Link from "next/link";

const links: string[] = ["Home", "About", "Contact", "Faqs"];

import type { PathnameProps } from "@/types";

function LoggedoutNavLinks({ pathname }: PathnameProps) {
  return (
    <ul className="flex items-center justify-center gap-2">
      {links.map((item) => {
        return (
          <li key={"login-desktop-menu-link" + item}>
            <Link
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`px-3 py-1.5 ${
                pathname ===
                  `/${item === "Home" ? "/" : `${item.toLowerCase()}`}` &&
                "text-brand-primary"
              } font-medium`}
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(LoggedoutNavLinks);
