"use client";
import { memo, useState } from "react";
import Link from "next/link";
import PrimaryCard from "@/component/common/PrimaryCard";
import GoogleAuthButton from "@/app/(public)/(auth)/_components/GoogleAuthButton";
import GithubAuthButton from "@/app/(public)/(auth)/_components/GithubAuthButton";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoginError from "@/app/(public)/(auth)/_components/LoginError";

function RegisterPage() {
  const [GoogleButtonLoading, setGoogleButtonLoading] = useState(false);
  const [GithubButtonLoading, setGithubButtonLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || null;

  const handleGoogleLogin = () => {
    setGoogleButtonLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubLogin = () => {
    setGithubButtonLoading(true);
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <PrimaryCard className="w-full max-w-md px-10 py-8">
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

        {error && <LoginError />}

        <div className="mt-6 text-center">
          <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
            Already have an account?{" "}
            <Link
              href="/login"
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
