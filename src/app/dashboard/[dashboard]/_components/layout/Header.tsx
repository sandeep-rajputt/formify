"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxToolkit";
import GithubStar from "@/app/dashboard/[dashboard]/_components/ui/GithubStar";
import Logo from "@/component/svg/Logo";
import { toggleSidebar } from "@/Store/slice/dashboardSidebarSlice";
import MenuIcon from "@/component/svg/MenuIcon";
import OppositeMenuIcon from "@/component/svg/OppositeMenuIcon";

function DashboardHeader() {
  const { isOpen: isSidebarOpen } = useAppSelector(
    (state) => state.dashboardSidebar
  );
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(toggleSidebar());
  }

  return (
    <header className="flex p-5 bg-light-surface dark:bg-dark-surface">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <button
            className="cursor-pointer 2xl:hidden block"
            onClick={handleClick}
          >
            {isSidebarOpen ? (
              <MenuIcon
                size={20}
                className="opacity-50 hover:opacity-70 transition-opacity duration-100"
              />
            ) : (
              <OppositeMenuIcon
                size={20}
                className="opacity-50 hover:opacity-70 transition-opacity duration-100"
              />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <h1 className="font-semibold text-2xl">Formify</h1>
          </div>
        </div>
        <div>
          <GithubStar />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
