import { LayoutDashboard, Building2, Users, Package, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import { logoutUser } from "@/lib/actions/auth/auth";
import { usePathname } from "next/navigation";

interface NavigationProps {
    isMinimized?: boolean
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Companies", href: "/dashboard/company", icon: Building2 },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

export default function Navigation({isMinimized} : NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-12 flex flex-grow flex-col space-y-2 px-2 lg:mt-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-white lg:text-black ${
            pathname === item.href
              ? "bg-tertiary text-accent-foreground text-black"
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
      <Button
        className="flex items-center rounded-lg px-3 py-2 text-white text-sm font-medium transition-colors lg:text-black"
        onClick={() => logoutUser()}
      >
        <LogOut className="h-5 w-5 flex-shrink-0" />
        <span
          className={`ml-3 transition-all duration-300 ${isMinimized ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
        >
          Logout
        </span>
      </Button>
    </nav>
  );
}
