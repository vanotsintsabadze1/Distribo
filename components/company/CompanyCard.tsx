export default function CompanyCard({ name, address, phone, email }: Company) {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-6 py-4">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">{name}</h1>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Address:</span> {address}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
}
