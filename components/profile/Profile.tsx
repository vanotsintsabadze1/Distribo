import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

interface ProfileProps {
  userEmail: string;
  userRole: string;
}

export default function Profile({ userEmail, userRole }: ProfileProps) {
  return (
    <div className="m-auto py-6">
      <form className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full">
        <TextInput name="email" label="Email" placeholder={userEmail} className="pl-4 pr-2" disabled={true} />
        <TextInput name="role" label="Role" placeholder={userRole} className="pl-4 pr-2" disabled={true} />
        <TextInput name="firstName" label="First Name" placeholder="e.g John" className="pl-4 pr-2" />
        <TextInput name="lastName" label="Last Name" placeholder="e.g Doe" className="pl-4 pr-2" />
        <div className="flex flex-col items-center bg-gray-50 p-6">
          <h1 className="tracking-tigh mb-6 text-xl font-semibold">Your Companies</h1>
          <div className="w-full max-w-4xl overflow-x-auto">
            <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
              <thead className="bg-gray-200 text-sm uppercase leading-normal">
                <tr>
                  <th className="px-6 py-3 text-left">Company Name</th>
                  <th className="px-6 py-3 text-left">Company ID Number</th>
                  <th className="px-6 py-3 text-left">Address</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-3 text-left">Company 1</td>
                  <td className="px-6 py-3 text-left">101101101</td>
                  <td className="px-6 py-3 text-left">Street #1</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-3 text-left">Company 2</td>
                  <td className="px-6 py-3 text-left">202202202</td>
                  <td className="px-6 py-3 text-left">Street #2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-1 flex w-full items-center justify-center">
          <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
