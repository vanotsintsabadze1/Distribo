import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { redirect } from "next/navigation";

interface PageAuthenticatorProps {
  redirectTo: string;
  shouldAllow: "admin" | "all" | "unauthorized";
  shouldNotAllowEmployee?: boolean;
  children: React.ReactNode;
}

export default async function PageAuthenticator({
  redirectTo,
  shouldAllow,
  shouldNotAllowEmployee,
  children,
}: PageAuthenticatorProps) {
  const auth = await getUserAuthStatus();
  const isAdmin = auth.data?.role.name === "Admin" || auth.data?.role.name === "Employee" ? true : false;
  const isUser = auth.data?.role.name === "User" ? true : false;
  const isEmployee = auth.data?.role.name === "Employee" ? true : false;

  if (shouldNotAllowEmployee && isEmployee) {
    return redirect(redirectTo);
  }

  if (shouldAllow === "all" && (isAdmin || isUser)) {
    return <>{children}</>;
  } else if (shouldAllow === "admin" && isAdmin) {
    return <>{children}</>;
  } else if (shouldAllow === "unauthorized" && !isAdmin && !isUser) {
    return <>{children}</>;
  } else {
    return redirect(redirectTo);
  }
}
