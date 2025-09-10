"use client";
import { memo, useEffect, useState } from "react";
import PrimaryCard from "@/component/common/PrimaryCard";
import GoogleAuthButton from "@/app/(public)/(auth)/_components/GoogleAuthButton";
import GithubAuthButton from "@/app/(public)/(auth)/_components/GithubAuthButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function LoginPage() {
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
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
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
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-light-fg-muted dark:text-dark-fg-muted">
            Sign in to your account to continue
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
            Don&apos;t have an account?
            <Link
              replace
              href="/register"
              className="text-brand-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </PrimaryCard>
    </div>
  );
}

export default memo(LoginPage);
