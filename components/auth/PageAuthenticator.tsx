import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { UserRole } from "@/lib/constants/constants";
import { redirect } from "next/navigation";

interface PageAuthenticatorProps {
  redirectTo: string;
  shouldAllow: "admin" | "all" | "unauthorized";
  shouldNotAllowEmployee?: boolean;
  shouldNotAllowBaseUser?: boolean;
  shouldNotAllowUnauthenticated?: boolean;
  shouldNotAllowStaff?: boolean;
  children: React.ReactNode;
}

export default async function PageAuthenticator({
  redirectTo,
  shouldAllow,
  shouldNotAllowEmployee,
  shouldNotAllowBaseUser,
  shouldNotAllowUnauthenticated,
  shouldNotAllowStaff,
  children,
}: PageAuthenticatorProps) {
  const auth = await getUserAuthStatus();
  const role = auth.data?.role.name;
  const isAdmin = role === UserRole.Admin;
  const isStaffMember = role === UserRole.Admin || role === UserRole.Employee;
  const isBaseUser = role === UserRole.User;
  const isRootUser = role === UserRole.RootUser;
  const isEmployee = role === UserRole.Employee;

  if (shouldNotAllowUnauthenticated && (role === null || role === undefined)) {
    return redirect(redirectTo);
  }

  if (shouldNotAllowStaff && isStaffMember) {
    return redirect(redirectTo);
  }

  if (shouldNotAllowEmployee && isEmployee) {
    return redirect(redirectTo);
  }

  if (shouldNotAllowBaseUser && isBaseUser) {
    return redirect(redirectTo);
  }

  if (shouldAllow === "all" && (isStaffMember || isBaseUser || isRootUser)) {
    return <>{children}</>;
  } else if (shouldAllow === "admin" && isStaffMember) {
    return <>{children}</>;
  } else if (shouldAllow === "unauthorized" && !isStaffMember && !isBaseUser && !isRootUser) {
    return <>{children}</>;
  } else {
    return redirect(redirectTo);
  }
}
