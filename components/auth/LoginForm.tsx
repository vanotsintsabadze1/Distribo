"use client";

import { useState } from "react";
import Button from "../UI/Button";
import { validateFormData } from "@/lib/utils/validation";
import { loginFormSchema } from "@/lib/schema/schema";
import { LoginData, LoginErrors } from "@/types/schema-types";

export default function LoginForm() {
  const [loginFormData, setloginFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, data } = validateFormData(loginFormSchema, loginFormData);

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
        value={loginFormData.email}
        onChange={handleChange}
        className="rounded-md border border-solid p-2 pl-4"
      />
      {errors.email && <p className="mt-2 text-red-600">{errors.email}</p>}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={loginFormData.password}
        onChange={handleChange}
        className="rounded-md border border-solid p-2 pl-4"
      />
      {errors.password && (
        <p className="mt-2 text-red-600">{errors.password}</p>
      )}
      <div className="mb-5 flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="h-4 w-4 rounded border"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Remember me
        </label>
      </div>
      <div className="flex justify-between">
        <Button type="submit" className="w-full bg-secondary text-white">
          Login
        </Button>
      </div>
    </form>
  );
}
