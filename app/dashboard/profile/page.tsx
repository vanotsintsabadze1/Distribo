import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";
import Profile from "@/components/profile/Profile";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getUserToken } from "@/lib/actions/helpers/getUserToken";
import { API_URL } from "@/lib/constants/constants";

async function getCompany() {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Company`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data = await res.json();

    // prettier-ignore
    return res.ok ? { status: 200, message: "Successfully fetched the companies", data } : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}

export default async function ProfilePage() {
  const userData = await getUserAuthStatus();
  const userEmail = userData.data?.email;
  const userRole = await getUserRole()
  const companiesData = await getCompany();
  const company = companiesData ? companiesData.data : null;

  return (
    <PageLayoutComp title="Profile" description="Update your profile information.">
      <CompanyCreationNavigatorButton />
      {userRole && userEmail !== undefined && <Profile userEmail={userEmail} userRole={userRole} company={company}/>}
    </PageLayoutComp>
  );
}
