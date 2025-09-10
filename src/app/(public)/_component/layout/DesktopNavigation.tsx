import LoggedinNavLinks from "@/app/(public)/_component/optimized/LoggedinNavLinks";
import LoggedoutNavLinks from "@/app/(public)/_component/optimized/LoggedoutNavLinks";

import type { NavigationProps } from "@/types";

function DesktopNavigation({ loggedin, pathname }: NavigationProps) {
  return (
    <nav className="lg:flex items-center justify-center  hidden">
      <div>
        {loggedin ? (
          <LoggedinNavLinks pathname={pathname} />
        ) : (
          <LoggedoutNavLinks pathname={pathname} />
        )}
      </div>
    </nav>
  );
}

export default DesktopNavigation;
