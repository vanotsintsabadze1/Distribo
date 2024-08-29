import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-3">
      <label>Email</label>
      <input
        type="email"
        placeholder="johndoe23@gmail.com"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="********"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="********"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <div className="flex w-full items-center gap-x-[5px] py-1">
        <input
          id="tos"
          type="checkbox"
          value=""
          className="h-4 w-4 rounded border"
          required
        />
        <label htmlFor="tos">
          <span className="text-sm font-medium text-gray-900">
            I agree to the{" "}
          </span>
          <Link href="/tos" className="text-sm text-blue-600 underline">
            Terms of Service
          </Link>
        </label>
      </div>
      <div className="mt-1 flex items-center justify-center">
        <Button type="submit" className="w-full bg-secondary text-white">
          Sign up
        </Button>
      </div>
    </form>
  );
}
