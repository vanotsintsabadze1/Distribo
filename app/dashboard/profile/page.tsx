import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";
import Profile from "@/components/profile/Profile";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { getCompany } from "@/lib/actions/company/getCompany";

export default async function ProfilePage() {
  const userData = await getUserAuthStatus();
  const userEmail = userData.data?.email;
  const userRole = userData.data?.role.name;
  const companiesData = await getCompany();
  const company = companiesData ? companiesData.data : null;

  return (
    <PageLayoutComp title="Profile" description="Update your profile information.">
      <CompanyCreationNavigatorButton />
      {userRole && userEmail !== undefined && <Profile userEmail={userEmail} userRole={userRole} company={company} />}
    </PageLayoutComp>
  );
}
