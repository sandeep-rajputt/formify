import { Metadata } from "next";
import { Suspense } from "react";
import RegisterPageContent from "./RegisterPageContent";
import getServerSessionUser from "@/hooks/useServerSessionUser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register | Create your account | Formify",
  description: "Sign up for a Formify account to get started.",
};

async function RegisterPage() {
  const user = await getServerSessionUser();
  if (user) {
    redirect(`/dashboard/${user.dashboard}`);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}

export default RegisterPage;
