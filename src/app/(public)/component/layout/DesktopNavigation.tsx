import LoggedinNavLinks from "@/app/(public)/component/optimized/LoggedinNavLinks";
import LoggedoutNavLinks from "@/app/(public)/component/optimized/LoggedoutNavLinks";

interface DesktopNavigationProps {
  loggedin: boolean;
  pathname: string;
}

function DesktopNavigation({ loggedin, pathname }: DesktopNavigationProps) {
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
