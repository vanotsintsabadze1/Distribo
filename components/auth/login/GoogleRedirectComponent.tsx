"use client";

import { googleAuthenticationAction } from "@/lib/actions/auth/authActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GoogleRedirectComponentProps {
  code: string;
}

export default function GoogleRedirectComponent({ code }: GoogleRedirectComponentProps) {
  const router = useRouter();
  const googleAuthenticateHandler = async () => {
    await googleAuthenticationAction(code);
    router.push("/dashboard");
  };

  useEffect(() => {
    googleAuthenticateHandler();
  }, []);

  return null;
}
