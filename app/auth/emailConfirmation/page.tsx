import { confirmEmailAfterRegistration } from "@/lib/actions/auth/auth";
import { redirect } from "next/navigation";

interface EmailConfirmationPageProps {
  searchParams: {
    [key: string]: string;
  };
}

export default async function EmailConfirmationPage({ searchParams }: EmailConfirmationPageProps) {
  if (!searchParams.token) {
    return redirect("/auth/login");
  }

  const res = await confirmEmailAfterRegistration(searchParams.token);

  return redirect("/auth/login");
}
