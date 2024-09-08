"use client";

import React, { useState } from "react";
import { ChevronLeft, LayoutDashboard, Building2, Users, Package, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Companies", href: "/dashboard/company", icon: Building2 },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  function handleToggle() {
    setIsMinimized(!isMinimized);
  }

  return (
    <aside
      className={`hidden h-[100dvh] border-r-2 border-gray-100 bg-[#fdf9f7] transition-all duration-300 ease-in-out lg:block ${
        isMinimized ? "w-[4.5rem]" : "w-64"
      }`}
    >
      <div className="relative flex h-full flex-col">
        <div className="flex h-16 items-center px-4">
          <Logo />
        </div>
        <button
          onClick={handleToggle}
          className="text-foreground absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md transition-transform duration-300 hover:bg-gray-100"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${isMinimized ? "rotate-180" : ""}`} />
        </button>
        <nav className="mt-6 flex flex-grow flex-col space-y-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-tertiary text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span
                className={`ml-3 transition-all duration-300 ${isMinimized ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
