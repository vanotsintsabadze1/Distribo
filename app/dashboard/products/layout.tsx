import PageAuthenticator from "@/components/auth/PageAuthenticator";

export default function ProductPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageAuthenticator shouldAllow="all" redirectTo="/dashboard">
      {children}
    </PageAuthenticator>
  );
}
