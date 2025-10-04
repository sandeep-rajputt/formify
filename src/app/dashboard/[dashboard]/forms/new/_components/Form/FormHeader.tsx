import { MenuButton } from "@headlessui/react";
import DropDown from "@/component/headlessui/DropDown";
import SendIcon from "@/component/svg/SendIcon";
import EditIcon from "@/component/svg/EditIcon";
import MenuBtn from "@/component/headlessui/MenuBtn";
import Separator from "@/component/headlessui/Separator";
import SpinnerIcon from "@/component/svg/SpinnerIcon";
import DraftDocumentIcon from "@/component/svg/DraftDocumentIcon";
import SecondarySquareButton from "@/component/common/SecondarySquareButton";
import PreviewIcon from "@/component/svg/PreviewIcon";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";

interface FormHeaderProps {
  totalFields: number;
  onPublish: () => void;
  isPublishing?: boolean;
  onDraft: () => void;
  isDrafting?: boolean;
  onEdit: () => void;
  onPreview?: () => void;
}

function FormHeader({
  totalFields = 0,
  onPublish,
  isPublishing = false,
  onEdit,
  isDrafting = false,
  onPreview,
}: FormHeaderProps) {
  return (
    <div className="bg-light-surface dark:bg-dark-surface">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Form Info */}
          <div className="flex items-center space-x-4">
            <div className="flex">
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-light-fg/60 dark:text-dark-fg/60">
                  {totalFields} {totalFields === 1 ? "field" : "fields"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex  space-x-3">
            {/* Preview Button */}
            <SecondarySquareButton
              disabled={isDrafting || isPublishing}
              title="Preview"
              handleClick={onPreview}
              className="!font-normal !gap-2 px-2 py-1 text-xs"
            >
              {isDrafting ? <SpinnerIcon /> : <PreviewIcon />}
              <span>Preview</span>
            </SecondarySquareButton>

            <PrimarySquareButton
              handleClick={onPublish}
              disabled={isPublishing || isDrafting}
              title="Publish Form"
              className="!font-normal !gap-2  text-xs xs:flex hidden"
            >
              {isPublishing ? <SpinnerIcon /> : <SendIcon size={14} />}
              <span>Publish</span>
            </PrimarySquareButton>

            <DropDown mainButton={<MoreOptionButton />}>
              <MenuBtn
                handleClick={onEdit}
                key={"Edit Form"}
                title={"Edit Form"}
                className=""
              >
                <EditIcon size={16} />
                <span>Edit Form</span>
              </MenuBtn>
              <MenuBtn
                handleClick={() => {}}
                key={"Draft Form"}
                title={"Draft Form"}
                className=""
              >
                {isDrafting ? <SpinnerIcon /> : <DraftDocumentIcon />}

                <span>Draft</span>
              </MenuBtn>

              <div className="xs:hidden block">
                <Separator />
                <MenuBtn
                  handleClick={() => {}}
                  key={"Publish Form"}
                  title={"Publish Form"}
                  className="!bg-brand-primary !hover:bg-brand-primary !text-white  data-focus:bg-brand-primary font-semibold "
                >
                  {isPublishing ? <SpinnerIcon /> : <SendIcon size={20} />}
                  <span>Publish Form</span>
                </MenuBtn>
              </div>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormHeader;

function MoreOptionButton() {
  return (
    <div className="rounded-lg w-fit flex items-center justify-center border dark:border-dark-fg/5 border-light-fg/10 bg-light-surface-alt dark:bg-dark-surface text-sm focus:outline-none data-[focus]:outline-2 data-[focus]:outline-light-bg overflow-hidden">
      <MenuButton className={"px-1 py-1.5 cursor-pointer"}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </MenuButton>
    </div>
  );
}
