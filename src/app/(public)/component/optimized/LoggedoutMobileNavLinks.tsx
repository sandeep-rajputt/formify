import { memo } from "react";
import MenuLink from "@/component/headlessui/MenuLink";

const links: string[] = ["Home", "About", "Contact", "Faqs"];

function LoggedoutMobileNavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {links.map((item) => {
        return (
          <MenuLink
            title={item === "Home" ? "Home" : item}
            key={"non-login-mobile-menu-link" + item}
            link={`${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
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

export default memo(LoggedoutMobileNavLinks);
