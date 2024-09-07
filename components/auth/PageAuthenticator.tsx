import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { redirect } from "next/navigation";

interface PageAuthenticatorProps {
  redirectTo: string;
  children: React.ReactNode;
}

export default async function PageAuthenticator({ redirectTo, children }: PageAuthenticatorProps) {
  const auth = await getUserAuthStatus();
  const isAdmin = auth.data?.role.name === "Admin" || auth.data?.role.name === "Employee" ? true : false;

  if (isAdmin) {
    <>{children}</>;
  } else {
    return redirect(redirectTo);
  }
}
