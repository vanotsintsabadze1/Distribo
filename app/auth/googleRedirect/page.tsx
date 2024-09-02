import GoogleRedirectComponent from "@/components/auth/login/GoogleRedirectComponent";
import { redirect } from "next/navigation";

interface GoogleRedirectPageProps {
  searchParams: Record<string, string>;
}

export default async function GoogleRedirectPage({ searchParams }: GoogleRedirectPageProps) {
  if (!searchParams.code) {
    return redirect("/auth/login");
  }

  const params = searchParams;
  console.log("🚀 ~ GoogleRedirectPage ~ params:", params);

  const code = searchParams.code;

  return <GoogleRedirectComponent code={code} />;
}
