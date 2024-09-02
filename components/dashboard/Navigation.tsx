"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, LogOut, User } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth/authActions";

interface NavigationProps {
  isMinimized?: boolean;
}

export default function Navigation({ isMinimized }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-10">
      <div className="flex flex-col gap-2 px-3 py-2 font-medium">
        <Link
          href="/dashboard"
          className={`${pathname === "/dashboard" && "bg-tertiary"} flex w-full gap-2 rounded-lg p-2 px-4`}
        >
          <LayoutDashboard />
          {!isMinimized && "Dashboard"}
        </Link>
        <Link
          href="/dashboard/company"
          className={`${pathname === "/dashboard/company" && "bg-tertiary"} flex w-full gap-2 rounded-lg p-2 px-4`}
        >
          <Building2 />
          {!isMinimized && "Companies"}
        </Link>
        <Link
          href="/dashboard/users"
          className={`${pathname === "/dashboard/users" && "bg-tertiary"} flex w-full gap-2 rounded-lg p-2 px-4`}
        >
          <User />
          {!isMinimized && "Users"}
        </Link>
        <button type="button" className="flex w-full gap-2 rounded-lg p-2 px-4" onClick={() => logoutAction()}>
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
