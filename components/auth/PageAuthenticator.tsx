import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
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
  const role = await getUserRole();
  const isUser = role === UserRole.User;
  const isEmployee = role === UserRole.Employee;
  const isAdmin = role === UserRole.Admin || role === "Employee";

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
