import Link from "next/link";
import Button from "../ui/Button";
import { LayoutDashboard, Building2, Users, Package, UserCircle, LogOut, ListOrdered } from "lucide-react";
import { logoutUser } from "@/lib/actions/auth/auth";
import { usePathname } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { UserRole } from "@/lib/constants/constants";
import toast from "react-hot-toast";

interface NavigationProps {
  isMinimized?: boolean;
  userData: UserDataPayload;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Companies", href: "/dashboard/company", icon: Building2 },
  { name: "Orders", href: "/dashboard/orders", icon: ListOrdered },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

export default function Navigation({ isMinimized, userData }: NavigationProps) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>();

  async function retrieveUserRole() {
    const res = await getUserRole();
    setRole(res);
  }

  function handleCheckRootUserRole(navItemPath: string) {
    if (role === UserRole.RootUser && navItemPath === "/dashboard/orders" && userData.company === null) {
      toast.error("Add company to see your orders");
    }
  }

  useLayoutEffect(() => {
    retrieveUserRole();
  }, []);

  return (
    <nav className="mt-14 flex flex-grow flex-col space-y-2 px-2 lg:mt-6">
      {navItems.map((item) => (
        <button
          key={item.href}
          className={` ${(item.name === "Users" || item.name === "Companies") && role !== UserRole.Admin && role !== UserRole.Employee && "hidden"}`}
          onClick={() => handleCheckRootUserRole(item.href)}
        >
          <Link
            href={item.href}
            className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:text-black ${
              pathname === item.href ? "bg-tertiary text-black" : "text-white"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={`ml-3 transition-all duration-300 ${isMinimized ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
            >
              {item.name}
            </span>
          </Link>
        </button>
      ))}
      <button
        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors lg:text-black"
        onClick={() => logoutUser()}
      >
        <LogOut className="h-5 w-5 flex-shrink-0" />
        <span
          className={`ml-3 transition-all duration-300 ${isMinimized ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
        >
          Logout
        </span>
      </button>
    </nav>
  );
}
