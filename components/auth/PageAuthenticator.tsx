import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { UserRole } from "@/lib/constants/constants";
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
  const isAdmin = auth.data?.role.name === UserRole.Admin || auth.data?.role.name === UserRole.Employee;
  const isUser = auth.data?.role.name === UserRole.User;
  const isEmployee = auth.data?.role.name === UserRole.Employee;

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
