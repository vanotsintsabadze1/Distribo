import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";
import Profile from "@/components/profile/Profile";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";

export default async function ProfilePage() {
  const userData = await getUserAuthStatus();
  const userEmail = userData.data?.email;
  const userRole = await getUserRole();
  const companiesData = await getCompanyOrders(0, 1);
  const company = companiesData ? companiesData.data : null;

  return (
    <PageLayoutComp title="Profile" description="Update your profile information.">
      <CompanyCreationNavigatorButton />
      {userRole && userEmail !== undefined && <Profile userEmail={userEmail} userRole={userRole} company={company} />}
    </PageLayoutComp>
  );
}
