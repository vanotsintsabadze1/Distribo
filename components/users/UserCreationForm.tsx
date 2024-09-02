"use client";

import { useState } from "react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { validateFormData } from "@/lib/utils/validation";
import { createUserSchema } from "@/lib/schema/schema";
import { CreateUserError } from "@/types/schema-types";
import ErrorMessage from "../ui/ErrorMessage";

export default function UserCreationForm() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [formErrors, setErrors] = useState<CreateUserError>({});

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const { errors, data } = validateFormData(createUserSchema, userForm);

    console.log(errors);
    console.log(data);
    errors ? setErrors(errors) : setErrors({});
  }

  return (
    <form className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full">
      <TextInput
        label="Email Address"
        value={userForm.email}
        onChange={handleChange}
        name="email"
        placeholder="e.g johndoe30@gmail.com"
        error={formErrors.email}
      />
      <TextInput
        label="Password"
        value={userForm.password}
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="e.g Something123$!@"
        error={formErrors.password}
      />
      <TextInput
        label="Confirm Password"
        value={userForm.confirmPassword}
        onChange={handleChange}
        type="password"
        name="confirmPassword"
        placeholder="e.g Something123$!@"
        error={formErrors.confirmPassword}
      />
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="role" className="text-sm font-bold text-gray-700">
          Role
        </label>
        <select
          name="role"
          value={userForm.role}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button onClick={handleSubmit} type="submit" className="w-32 bg-secondary font-semibold text-white">
          Create
        </Button>
      </div>
    </form>
  );
}
