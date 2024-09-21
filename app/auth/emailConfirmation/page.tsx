"use client";

import { logoutUser } from "@/lib/actions/auth/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

export default function EmailConfirmationPage() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      setSuccess(true);
      setTimeout(() => {
        logoutUser();
      }, 5000);
    };

    confirmEmail();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {success ? (
          <div>
            <h1 className="mb-4 text-2xl font-bold text-green-600">Email Confirmed!</h1>
            <p className="text-secondary">
              Your email has been successfully confirmed. You will be redirected to the login page in 5 seconds.
            </p>
          </div>
        ) : (
          <div>
            <Spinner color="black" size={20} />
            <h1 className="my-4 text-2xl font-bold text-black">Verifying your email...</h1>
            <p className="text-secondary">Please wait while we verify your email address.</p>
          </div>
        )}
      </div>
    </div>
  );
}
