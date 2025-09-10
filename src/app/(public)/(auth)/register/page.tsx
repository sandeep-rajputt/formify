import { Metadata } from "next";
import { Suspense } from "react";
import RegisterPageContent from "./RegisterPageContent";

export const metadata: Metadata = {
  title: "Register | Create your account | Formify",
  description: "Sign up for a Formify account to get started.",
};

function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}

export default RegisterPage;
