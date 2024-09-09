import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";
import Profile from "@/components/profile/Profile";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";

export default async function ProfilePage() {
  const userData = await getUserAuthStatus();
  const userEmail = userData.data?.email;
  const userRole = userData.data?.role.name;

  return (
    <PageLayoutComp title="Profile" description="Update your profile information.">
      <CompanyCreationNavigatorButton />
      {userData.data && <Profile userEmail={userEmail} userRole={userRole} />}
    </PageLayoutComp>
  );
}
