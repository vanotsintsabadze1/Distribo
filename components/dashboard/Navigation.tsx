"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, User } from "lucide-react";

interface NavigationProps {
  isMinimized?: boolean;
}

export default function Navigation({ isMinimized }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-10">
      <div className="px-3 py-2">
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
          {!isMinimized && "Company"}
        </Link>
        <Link
          href="/dashboard/user"
          className={`${pathname === "/dashboard/user" && "bg-tertiary"} flex w-full gap-2 rounded-lg p-2 px-4`}
        >
          <User />
          {!isMinimized && "User"}
        </Link>
      </div>
    </div>
  );
}
