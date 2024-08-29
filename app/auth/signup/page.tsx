import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign up an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password below to sign up your account
          </p>
        </div>
        <SignupForm />
        <Link
          href="/auth/login"
          className="text-center text-sm text-blue-600 underline"
        >
          Already have an account?
        </Link>
      </div>
    </AuthLayout>
  );
}
