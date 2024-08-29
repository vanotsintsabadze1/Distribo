// import CompanyCreationButton from "@/components/company/CompanyCreationButton";

export default function CompanyPage() {
  return (
    <div className="w-full p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          All the created companies are listed below
        </p>
      </div>
      <div className="flex w-full justify-end">
        {/* <CompanyCreationButton /> */}
      </div>
    </div>
  );
}
