import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication form",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login an account
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email and password below to login your account
            </p>
          </div>
          <LoginForm />

          <Link
            href="/auth/signup"
            className="text-center text-sm text-blue-600 underline"
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
