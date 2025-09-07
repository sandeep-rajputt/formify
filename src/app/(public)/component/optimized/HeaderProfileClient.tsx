"use client";
import { useState } from "react";
import { RxExit } from "react-icons/rx";
import DropDown from "@/component/headlessui/DropDown";
import EllipsisText from "@/component/common/EllipsisText";
import MenuBtn from "@/component/headlessui/MenuBtn";
import { MenuButton } from "@headlessui/react";
import Image from "next/image";
import ConfirmationModal from "@/component/common/ConfirmationModal";

import type { HeaderProfileClientProps, UserData } from "@/types";

function HeaderProfileClient({
  userData,
  profileMenuItems,
}: HeaderProfileClientProps) {
  const [confirmLogoutModal, setConfirmLogoutModal] = useState<boolean>(false);

  function handleConfirm() {
    console.log("logout");
  }

  function handleCancel() {
    setConfirmLogoutModal(false);
  }

  return (
    <div>
      <DropDown mainButton={<UserProfileButton userData={userData} />}>
        {profileMenuItems}
        <MenuBtn
          handleClick={() => setConfirmLogoutModal(true)}
          title="Log out"
        >
          <RxExit className="text-bt-secondary dark:text-wt-secondary" />
          <EllipsisText>Log out</EllipsisText>
        </MenuBtn>
      </DropDown>
      {confirmLogoutModal && (
        <ConfirmationModal
          heading="Logout Confirmation"
          handleCancel={handleCancel}
          danger={true}
          handleConfirm={handleConfirm}
        >
          <p className="text-sm text-bt-secondary dark:text-wt-secondary">
            Are you sure you want to log out?
          </p>
        </ConfirmationModal>
      )}
    </div>
  );
}

function UserProfileButton({ userData }: { userData: UserData }) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden">
      <MenuButton className={"cursor-pointer"}>
        <Image
          width={32}
          height={32}
          src={userData.avatar}
          alt={`${userData.name} Image`}
          draggable="false"
          className="w-full h-full rounded-full object-cover scale-110"
        />
      </MenuButton>
    </div>
  );
}

export default HeaderProfileClient;
