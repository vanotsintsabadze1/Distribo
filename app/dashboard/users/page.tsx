import PageLayoutComp from "@/components/ui/PageLayoutComp";
import UserCreationNavigatorButton from "@/components/users/UserCreationNavigatorButton";

export default function UsersPage() {
  return (
    <PageLayoutComp title="Users" description="All the users are listed below.">
      <UserCreationNavigatorButton />
    </PageLayoutComp>
  );
}
