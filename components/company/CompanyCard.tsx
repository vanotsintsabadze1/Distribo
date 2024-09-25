import Link from "next/link";

export default function CompanyCard({ name, address, phone, email }: Company) {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white lg my-6">
      <div className="w-full flex flex-col items-center">
        <div className="w-32 relative h-32 rounded-full border-2 border-gray-100">
          <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
            <p className="text-xl font-bold">SC</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <span className="font-bold">{name}</span>
        </div>
        <Link className="text-green-600 mt-4 font-bold" href={`/dashboard/profile/my-company`}>
          View Company
        </Link>
      </div>
    </div>
  );
}
