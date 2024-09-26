import SingleCompany from "@/components/company/SingleCompany";
import SingleCompanyOrders from "@/components/company/SingleCompanyOrders";
import { getCompany } from "@/lib/actions/company/getCompany";
import Image from "next/image";

export default async function MyCompanyPage() {
  const companyData = await getCompany();
  const company = companyData ? companyData.data : null;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center">
        <section className="flex items-center justify-center">
          <div className="border-green relative h-32 w-32 rounded-full border-2 border-black">
            <Image
              src={"https://placehold.co/600x400/000000/FFFFFF/png"}
              alt="company-profile-picture"
              fill
              className="rounded-full"
            />
          </div>
        </section>
        <SingleCompany {...company}>
          <SingleCompanyOrders />
        </SingleCompany>
      </div>
    </div>
  );
}
