import { Metadata } from "next";
import { Suspense } from "react";
import LoginPageContent from "./LoginPageContent";

export const metadata: Metadata = {
  title: "Sign in | Formify",
  description: "Sign in to your Formify account to continue.",
};

function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}

export default LoginPage;
