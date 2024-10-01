import PageLayoutComp from "@/components/ui/PageLayoutComp";
import UserCreationForm from "@/components/users/UserCreationForm";

export default function UserCreationPage() {
  return (
    <PageLayoutComp title="Create a new user" description="Fill in the form below to create a new user">
      <UserCreationForm />
    </PageLayoutComp>
  );
}
