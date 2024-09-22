"use client";

import { confirmEmailAfterRegistration, logoutUser } from "@/lib/actions/auth/auth";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";

interface EmailConfirmationPageProps {
  searchParams: {
    [key: string]: string;
  };
}

export default function EmailConfirmationPage({ searchParams }: EmailConfirmationPageProps) {
  const [status, setStatus] = useState<"" | "confirmed" | "notConfirmed">("");

  useEffect(() => {
    const confirmEmail = async () => {
      const res = await confirmEmailAfterRegistration(searchParams.token);
      if (res.status === 200) {
        setStatus("confirmed");
      } else {
        setStatus("notConfirmed");
      }
      setTimeout(() => {
        logoutUser();
      }, 5000);
    };

    confirmEmail();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {status === "confirmed" && (
          <div>
            <h1 className="mb-4 text-2xl font-bold text-green-600">Email Confirmed!</h1>
            <p className="text-secondary">
              Your email has been successfully confirmed. You will be redirected to the login page in 5 seconds.
            </p>
          </div>
        )}
        {status === "notConfirmed" && (
          <div>
            <h1 className="mb-4 text-2xl font-bold text-red-600">Email didn't confirm!</h1>
            <p className="text-secondary">
              Your email could not be confirmed. Please contact the administrator for assistance
            </p>
          </div>
        )}
        {status === "" && (
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
