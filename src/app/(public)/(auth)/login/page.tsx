import { Metadata } from "next";
import { Suspense } from "react";
import LoginPageContent from "./LoginPageContent";
import getServerSessionUser from "@/hooks/useServerSessionUser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in | Formify",
  description: "Sign in to your Formify account to continue.",
};

async function LoginPage() {
  const user = await getServerSessionUser();
  if (user) {
    redirect(`/dashboard/${user.dashboard}`);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}

export default LoginPage;
