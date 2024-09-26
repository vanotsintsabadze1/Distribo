'use client'

import { useForm } from "react-hook-form";
import CompanyCard from "../company/CompanyCard";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/schema/schema";
import { ProfileSchema } from "@/types/schema-types";

interface ProfileProps {
  userEmail: string;
  userRole: string;
  company: Company;
}

export default function Profile({ userEmail, userRole, company }: ProfileProps) {
  const {
    register,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });
  return (
    <div className="m-auto py-6">
      <form className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full">
        <TextInput
          name="email"
          label="Email"
          placeholder={userEmail}
          className="pl-4 pr-2"
          disabled={true}
          register={register}
        />
        <TextInput
          name="role"
          label="Role"
          placeholder={userRole}
          className="pl-4 pr-2"
          disabled={true}
          register={register}
        />
        <TextInput
          name="firstName"
          label="First Name"
          placeholder="e.g John"
          className="pl-4 pr-2"
          register={register}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          placeholder="e.g Doe"
          className="pl-4 pr-2"
          register={register}
        />
        {userRole === "User" && company && (
          <div className="mx-auto">
            <h1 className="text-center text-xl font-semibold">Your Company</h1>
            <CompanyCard {...company} />
          </div>
        )}
        <div className="mt-1 flex w-full items-center justify-center">
          <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
