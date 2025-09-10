// =============================================================================
// COMMON COMPONENT TYPES
// =============================================================================

// For components who only need children and optional className
export type ClassNameAndChildrenProps = {
  children: React.ReactNode;
  className?: string;
};

// For components that only need optional className
export type ClassNameOnlyProps = {
  className?: string;
};

// =============================================================================
// COMMON COMPONENTS - src/component/common/
// =============================================================================

// ConfirmationModal.tsx
export type ConfirmationModalProps = {
  heading: string;
  children: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  danger?: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  className?: string;
};

// ConfirmationModal's Sub modal
export type ConfirmationModalSubModalProps = {
  heading: string;
  children: React.ReactNode;
  cancelText: string;
  confirmText: string;
  danger: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  className: string;
};

// PrimarySquareButton.tsx
export type PrimarySquareButtonProps = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  handleClick?: () => void;
};

// PrimaryLink.tsx
export type PrimaryLinkProps = {
  children: React.ReactNode;
  className?: string;
  link: string;
  external?: boolean;
  title?: string;
};

// SecondarySquareButton.tsx
export type SecondarySquareButtonProps = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  handleClick?: () => void;
};

// SimpleCard.tsx
export type SimpleCardProps = {
  children: React.ReactNode;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

// LoadingCircle.tsx
export type LoadingCircleProps = {
  className?: string;
};

// OverlayPortal.tsx
export type OverlayPortalProps = {
  children: React.ReactNode;
  containerId?: string;
};

// =============================================================================
// HEADLESS UI COMPONENTS - src/component/headlessui/
// =============================================================================

// Anchor positions for DropDown component
export type AnchorProps =
  | "bottom end"
  | "bottom start"
  | "top end"
  | "top start"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "left start"
  | "left end"
  | "right start"
  | "right end"
  | undefined;

// DropDown.tsx
export type DropDownProps = {
  children: React.ReactNode;
  width?: string;
  anchor?: AnchorProps;
  mainButton: React.ReactNode;
  className?: string;
};

// MainButton.tsx
export type MainButtonProps = {
  children: React.ReactNode;
  className?: string;
};

// MenuBtn.tsx
export type MenuBtnProps = {
  children: React.ReactNode;
  title: string;
  handleClick: () => void;
  className?: string;
};

// MenuLink.tsx
export type MenuLinkProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  link: string;
  external?: boolean;
};

// Separator.tsx
export type SeparatorProps = {
  className?: string;
};

// =============================================================================
// SVG COMPONENTS - src/component/svg/
// =============================================================================

// Logo.tsx
export type LogoProps = {
  size?: number;
};

// =============================================================================
// PUBLIC APP LAYOUT COMPONENTS - src/app/(public)/component/layout/
// =============================================================================

// DesktopNavigation.tsx & MobileNavigation.tsx
export type NavigationProps = {
  loggedin: boolean;
  pathname: string;
};

// =============================================================================
// PUBLIC APP OPTIMIZED COMPONENTS - src/app/(public)/component/optimized/
// =============================================================================

// User roles type
export type UserRole = "user" | "admin" | "owner";

// User data interface for HeaderProfile components
export interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
}

// HeaderProfileClient.tsx
export type HeaderProfileClientProps = {
  userData: UserData;
  profileMenuItems: React.ReactNode;
};

// Navigation link components that take pathname
export type PathnameProps = {
  pathname: string;
};

// =============================================================================
// LAYOUT COMPONENTS - src/app/(public)/
// =============================================================================

// MarketingLayout (layout.tsx)
export type MarketingLayoutProps = {
  children: React.ReactNode;
};
