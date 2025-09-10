"use client";
import { memo, useEffect, useState } from "react";
import PrimaryCard from "@/component/common/PrimaryCard";
import GoogleAuthButton from "@/app/(public)/(auth)/_components/GoogleAuthButton";
import GithubAuthButton from "@/app/(public)/(auth)/_components/GithubAuthButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function RegisterPage() {
  const router = useRouter();

  const [GoogleButtonLoading, setGoogleButtonLoading] = useState(false);
  const [GithubButtonLoading, setGithubButtonLoading] = useState(false);

  const handleGoogleLogin = () => {
    setGoogleButtonLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  const handleGithubLogin = () => {
    setGithubButtonLoading(true);
    signIn("github", { callbackUrl: "/" });
  };

  function closeModel() {
    router.back();
  }

  useEffect(() => {
    // disable scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // enable scrolling
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      onClick={() => closeModel()}
      aria-hidden="true"
      className=" flex items-center z-[100000] justify-center px-5 fixed top-0 left-0 w-screen h-screen !backdrop-blur-xs"
    >
      <PrimaryCard
        handleClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full max-w-md px-10 py-8  shadow-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-light-fg-muted dark:text-dark-fg-muted">
            Get started with Formify today
          </p>
        </div>

        <div className="space-y-3">
          <GoogleAuthButton
            disabled={GithubButtonLoading || GoogleButtonLoading}
            loading={GoogleButtonLoading}
            handleClick={() => handleGoogleLogin()}
          >
            Continue with Google
          </GoogleAuthButton>
          <GithubAuthButton
            disabled={GithubButtonLoading || GoogleButtonLoading}
            loading={GithubButtonLoading}
            handleClick={() => handleGithubLogin()}
          >
            Continue with Github
          </GithubAuthButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
            Already have an account?
            <Link
              href="/login"
              replace
              className="text-brand-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </PrimaryCard>
    </div>
  );
}

export default memo(RegisterPage);
