import { getUserInfoAction } from "@/lib/actions/auth/authActions";

export default async function DashboardPage() {
  const userInfo = await getUserInfoAction();
  return (
    <div className="p-6 px-12">
      <h1 className="text-3xl font-bold">Hi {userInfo?.email}, welcome back 👋</h1>
    </div>
  );
}
