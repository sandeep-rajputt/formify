import Logo from "@/component/svg/Logo";
import PrimaryLink from "@/component/common/PrimaryLink";
import Link from "next/link";
import { headers } from "next/headers";
import MobileNavigation from "@/app/(public)/_component/layout/MobileNavigation";
import DesktopNavigation from "@/app/(public)/_component/layout/DesktopNavigation";
import dynamic from "next/dynamic";
import LoadingCircle from "@/component/common/LoadingCircle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const HeaderProfile = dynamic(
  () => import("@/app/(public)/_component/optimized/HeaderProfile"),
  {
    loading: () => (
      <div>
        <LoadingCircle className="w-8 h-8" />
      </div>
    ),
  }
);

async function PublicHeader() {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  return (
    <div className="fixed top-0 z-[10000] backdrop-blur w-full">
      <header className="max-w-7xl gap-4 w-full mx-auto grid h-[72px] px-5 py-4 lg:grid-cols-[auto_1fr_auto] grid-cols-[auto_auto] justify-between">
        <div className="flex items-center justify-center gap-3">
          <MobileNavigation
            loggedin={session?.user?.email ? true : false}
            pathname={pathname}
          />
          <div className="flex gap-2 items-center justify-center">
            <Logo size={32} />
            <h2 className="text-2xl font-semibold">Formify</h2>
          </div>
        </div>
        <DesktopNavigation
          loggedin={session?.user?.email ? true : false}
          pathname={pathname}
        />
        <div className="flex items-center justify-center gap-5">
          {session?.user?.email ? (
            <HeaderProfile user={session?.user} />
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 font-medium xs:block hidden"
              >
                Login
              </Link>
              <PrimaryLink link={"register"}>Register</PrimaryLink>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default PublicHeader;
