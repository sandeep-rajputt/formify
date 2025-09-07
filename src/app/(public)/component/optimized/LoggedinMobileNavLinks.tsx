import { memo } from "react";
import MenuLink from "@/component/headlessui/MenuLink";

const links: string[] = ["Home", "About", "Dashboard", "Contact"];

import type { PathnameProps } from "@/types";

function LoggedinMobileNavLinks({ pathname }: PathnameProps) {
  return (
    <>
      {links.map((item) => {
        return (
          <MenuLink
            title={item === "Home" ? "Home" : item}
            key={"login-mobile-menu-link" + item}
            link={`${item === "Home" ? "" : item.toLowerCase()}`}
            className={`px-3 py-1.5 ${
              pathname ===
                `/${item === "Home" ? "" : `${item.toLowerCase()}`}` &&
              "text-brand-primary"
            }`}
          >
            {item}
          </MenuLink>
        );
      })}
    </>
  );
}

export default memo(LoggedinMobileNavLinks);
