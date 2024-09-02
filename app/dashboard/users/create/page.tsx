import UserCreationForm from "@/components/users/UserCreationForm";

export default function UserCreationPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-14 px-4 py-5">
      <div className="flex w-full flex-col gap-1.5">
        <h1 className="text-2xl font-semibold">Create a new user</h1>
        <p className="text-sm text-gray-500">
          Fill in the form below to create a new user
        </p>
      </div>
      <UserCreationForm />
    </div>
  );
}
