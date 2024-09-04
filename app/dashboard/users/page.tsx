import UserCreationNavigatorButton from "@/components/users/UserCreationNavigatorButton";

export default function UsersPage() {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-1 text-sm">All the users are listed below</p>
      </div>
      <div className="flex w-full justify-end">
        <UserCreationNavigatorButton />
      </div>
    </div>
  );
}
