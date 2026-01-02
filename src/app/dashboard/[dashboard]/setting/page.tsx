"use client";
import React, { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import PrimaryCard from "@/component/common/PrimaryCard";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import SecondarySquareButton from "@/component/common/SecondarySquareButton";
import ConfirmationModal from "@/component/common/ConfirmationModal";
import UserSVG from "@/component/svg/UserSVG";
import {
  useGetUploadSignatureMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} from "@/lib/api/features/userApi";
import { useSessionUpdate } from "@/hooks/useSessionUpdate";
import { VscLoading } from "react-icons/vsc";

interface ProfileFormData {
  name: string;
}

export default function SettingPage() {
  const { session, updateSession } = useSessionUpdate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [getUploadSignature] = useGetUploadSignatureMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  // Update form when session changes
  React.useEffect(() => {
    if (session?.user?.name) {
      setValue("name", session.user.name);
    }
  }, [session?.user?.name, setValue]);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleImageSelect = (file: File) => {
    clearMessages();

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file");
      return;
    }

    setSelectedFile(file);
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    try {
      // Get upload signature from backend
      const signatureResponse = await getUploadSignature({
        folder: "profile-pictures",
      }).unwrap();

      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signatureResponse.signature);
      formData.append("timestamp", signatureResponse.timestamp.toString());
      formData.append("api_key", signatureResponse.apiKey);
      formData.append("folder", signatureResponse.folder);
      formData.append("transformation", "c_fill,w_400,h_400,q_auto");

      // Upload directly to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureResponse.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadResult = await uploadResponse.json();
      return uploadResult.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      clearMessages();
      setIsUploading(true);

      let imageUrl = session?.user?.image || "";

      // Upload image if user selected a new one
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }

      const response = await updateProfile({
        name: data.name,
        image: imageUrl,
      }).unwrap();

      // Update the session with new data - this will trigger immediate UI updates
      const sessionUpdated = await updateSession({
        name: response.user.name,
        image: response.user.image,
      });

      if (!sessionUpdated) {
        setErrorMessage(
          "Profile updated but session refresh failed. Please refresh the page."
        );
        return;
      }

      // Clear selected file and preview
      setSelectedFile(null);
      setSelectedImage("");

      setSuccessMessage("Profile updated successfully!");
    } catch (error: unknown) {
      console.error("Profile update error:", error);
      const errorMsg =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "error" in error.data
          ? (error.data as { error: string }).error
          : "Failed to update profile. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      clearMessages();
      await deleteAccount().unwrap();
      setSuccessMessage("Account deleted successfully!");
      setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, 1000);
    } catch (error: unknown) {
      console.error("Account deletion error:", error);
      const errorMsg =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "error" in error.data
          ? (error.data as { error: string }).error
          : "Failed to delete account. Please try again.";
      setErrorMessage(errorMsg);
      setShowDeleteModal(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const getCurrentProfileImage = () => {
    if (selectedImage) return selectedImage;
    return session?.user?.image || "";
  };

  const hasImageChanged = () => {
    return selectedFile !== null;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light-fg dark:text-dark-fg mb-2">
          Account Settings
        </h1>
        <p className="text-light-fg-muted dark:text-dark-fg-muted">
          Manage your profile information and account preferences
        </p>
      </div>

      {/* Error/Success Messages */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <p className="text-red-800 dark:text-red-200 text-sm">
            {errorMessage}
          </p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
          <p className="text-green-800 dark:text-green-200 text-sm">
            {successMessage}
          </p>
        </div>
      )}

      {/* Profile Section */}
      <PrimaryCard>
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                {getCurrentProfileImage() ? (
                  <Image
                    src={getCurrentProfileImage()}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-2 border-light-fg-muted/20 dark:border-dark-fg-muted/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-light-surface dark:bg-dark-surface border-2 border-light-fg-muted/20 dark:border-dark-fg-muted/20 flex items-center justify-center">
                    <UserSVG size={32} className="opacity-50" />
                  </div>
                )}
                {hasImageChanged() && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <SecondarySquareButton
                  handleClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {selectedFile ? "Change Picture" : "Select Picture"}
                </SecondarySquareButton>
                <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted">
                  JPG, PNG up to 5MB
                </p>
                {hasImageChanged() && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Click &quot;Save Changes&quot; to update
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Name Field */}
          <HookTextInput
            register={register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            label="Full Name"
            error={errors.name?.message}
            required
            placeholder="Enter your full name"
          />

          {/* Email Field (Read-only) */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium">Email Address</label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="border rounded-md border-light-fg-muted/20 dark:border-dark-fg-muted/20 h-9 px-2 text-light-fg/95 dark:text-dark-fg/95 text-sm bg-light-surface/50 dark:bg-dark-surface/50 cursor-not-allowed"
            />
            <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted">
              Email cannot be changed
            </p>
          </div>

          <div className="flex justify-end">
            <PrimarySquareButton
              handleClick={handleSubmit(onSubmit)}
              disabled={isUpdating || isUploading}
              className={isUpdating || isUploading ? "py-3" : ""}
            >
              {isUpdating || isUploading ? (
                <VscLoading className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </PrimarySquareButton>
          </div>
        </form>
      </PrimaryCard>

      {/* Danger Zone */}
      <PrimaryCard className="border-2 border-red-500/20">
        <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
          Danger Zone
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Delete Account</h3>
            <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted mb-4">
              Once you delete your account, there is no going back. This will
              permanently delete your account, all your forms, and all
              submissions.
            </p>
            <SecondarySquareButton
              handleClick={() => setShowDeleteModal(true)}
              className="!border-red-500 !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20"
            >
              Delete Account
            </SecondarySquareButton>
          </div>
        </div>
      </PrimaryCard>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50">
          <ConfirmationModal
            heading="Delete Account"
            danger={true}
            cancelText="Cancel"
            confirmText={isDeleting ? "Deleting..." : "Delete Account"}
            handleCancel={() => setShowDeleteModal(false)}
            handleConfirm={handleDeleteAccount}
          >
            <p className="mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                This will permanently delete:
              </p>
              <ul className="text-sm text-red-700 dark:text-red-300 mt-1 list-disc list-inside">
                <li>Your account and profile</li>
                <li>All your forms</li>
                <li>All form submissions</li>
                <li>All associated data</li>
              </ul>
            </div>
          </ConfirmationModal>
        </div>
      )}
    </div>
  );
}
