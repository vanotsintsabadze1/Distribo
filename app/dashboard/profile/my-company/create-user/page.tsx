import PageAuthenticator from "@/components/auth/PageAuthenticator";
import CompanyUserCreationForm from "@/components/profile/CompanyUserCreationForm";

export default function page() {
  return (
    <PageAuthenticator shouldNotAllowEmployee shouldNotAllowBaseUser redirectTo="/dashboard/profile" shouldAllow="all">
      <div className="items-center flex justify-center">
        <CompanyUserCreationForm />
      </div>
    </PageAuthenticator>
  );
}
