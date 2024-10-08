import PageAuthenticator from "@/components/auth/PageAuthenticator";
import Sidebar from "@/components/dashboard/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Basic dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageAuthenticator redirectTo="/auth/login" shouldAllow="all">
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden pt-10 md:px-4">{children}</main>
      </div>
    </PageAuthenticator>
  );
}
