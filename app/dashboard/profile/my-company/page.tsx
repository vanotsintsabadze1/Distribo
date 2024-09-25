import SingleCompany from "@/components/company/SingleCompany";
import { getCompany } from "@/lib/actions/company/getCompany";

export default async function MyCompanyPage() {
  const companyData = await getCompany();
  const company = companyData ? companyData.data : null;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <SingleCompany {...company} />
    </div>
  );
}
