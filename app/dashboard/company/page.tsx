import PageLayoutComp from "@/components/ui/PageLayoutComp";
import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";

export default function CompanyPage() {
  return (
    <PageLayoutComp title="Companies" description="All the created companies are listed below.">
      <CompanyCreationNavigatorButton />
    </PageLayoutComp>
  );
}
