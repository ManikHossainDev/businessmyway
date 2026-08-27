import VerifyEmail from "@/components/Pages/Auth/VerifyEmail/VefiyEmail";
import React, { Suspense } from "react";
export const metadata = {
  title: "Verify Email | BusinessMayWay",
  description: "This is the verify email page for our application",
  keywords: ["verify Email", "page", "example"],
};
const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
