"use client";

import React, { useState } from "react";
import Button from "../UI/Button";
import Link from "next/link";
import { SignUpData, SignUpErrors } from "@/types/schema-types";
import { validateFormData } from "@/lib/utils/validation";
import { signUpFormSchema } from "@/lib/schema/schema";

export default function SignupForm() {
  const [signUpFormData, setsignUpFormData] = useState<SignUpData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, data } = validateFormData(signUpFormSchema, signUpFormData);

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      console.log("Form data is valid:", data);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={signUpFormData.email}
        onChange={handleChange}
        placeholder="johndoe23@gmail.com"
        className="rounded-md border border-solid p-2 pl-4"
      />
      {errors.email && <p className="mt-2 text-red-600">{errors.email}</p>}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={signUpFormData.password}
        onChange={handleChange}
        placeholder="********"
        className="rounded-md border border-solid p-2 pl-4"
      />
      {errors.password && (
        <p className="mt-2 text-red-600">{errors.password}</p>
      )}
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={signUpFormData.confirmPassword}
        onChange={handleChange}
        placeholder="********"
        className="rounded-md border border-solid p-2 pl-4"
      />
      {errors.confirmPassword && (
        <p className="mt-2 text-red-600">{errors.confirmPassword}</p>
      )}
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
