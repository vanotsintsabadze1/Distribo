"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import { validateFormData } from "@/lib/utils/validation";
import { loginFormSchema } from "@/lib/schema/schema";
import { LoginData, LoginErrors } from "@/types/schema-types";
import TextInput from "../../ui/TextInput";
import { loginAction } from "@/lib/actions/auth/authActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GoogleAuthButton from "./GoogleAuthButton";

export default function LoginForm() {
  const [loginFormData, setloginFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, data } = validateFormData(loginFormSchema, loginFormData);

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      const { email, password } = data;
      const res = await loginAction({ email, password });

      if (res?.status === 200) {
        router.push("/dashboard");
      } else if (res?.status === 500) {
        toast.error("Something went wrong. Please try again later.");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <TextInput
        label="Email Address"
        value={loginFormData.email}
        onChange={handleChange}
        name="email"
        placeholder="e.g johndoe30@gmail.com"
        error={errors.email}
      />
      <TextInput
        label="Password"
        value={loginFormData.password}
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="e.g Something123$!@"
        error={errors.password}
      />

      <div className="mb-5 flex items-start">
        <div className="flex h-5 items-center">
          <input id="remember" type="checkbox" value="" className="h-4 w-4 rounded border" />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
          Remember me
        </label>
      </div>
      <div className="flex justify-between">
        <Button type="submit" className="w-full bg-secondary text-white">
          Login
        </Button>
      </div>
      <GoogleAuthButton />
    </form>
  );
}
