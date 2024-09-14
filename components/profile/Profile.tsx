import CompanyCard from "../company/CompanyCard";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

interface ProfileProps {
  userEmail: string;
  userRole: string;
  company: Company;
}

export default function Profile({ userEmail, userRole, company }: ProfileProps) {
  return (
    <div className="m-auto py-6">
      <form className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full">
        <TextInput name="email" label="Email" placeholder={userEmail} className="pl-4 pr-2" disabled={true} />
        <TextInput name="role" label="Role" placeholder={userRole} className="pl-4 pr-2" disabled={true} />
        <TextInput name="firstName" label="First Name" placeholder="e.g John" className="pl-4 pr-2" />
        <TextInput name="lastName" label="Last Name" placeholder="e.g Doe" className="pl-4 pr-2" />
        {userRole === "User" && (
          <div className="mx-auto">
            <h1 className="text-xl font-semibold text-center">Your Company</h1>
            <CompanyCard {...company} />
          </div>
        )}
        <div className="mt-1 flex w-full items-center justify-center">
          <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
