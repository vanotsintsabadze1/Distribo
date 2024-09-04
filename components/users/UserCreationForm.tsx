"use client";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { validateFormData } from "@/lib/utils/validation";
import { createUserSchema } from "@/lib/schema/schema";
import { CreateUserError } from "@/types/schema-types";
import { createUser } from "@/lib/actions/admin/users/createUser";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";

export default function UserCreationForm() {
  const [userForm, setUserForm] = useState<UserCreationPayload>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [formErrors, setErrors] = useState<CreateUserError>({});
  const [loading, setLoading] = useState(false);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const { errors } = validateFormData(createUserSchema, userForm);
    console.log(errors);

    if (errors) {
      setErrors(errors);
      setLoading(false);
      return;
    } else {
      setErrors({});
    }

    const res = await createUser(userForm);
    const success = await apiResponseValidator({ res, options: { outputGenericError: true } });

    success ? setUserForm({ email: "", password: "", confirmPassword: "", role: "User" }) : null;

    setLoading(false);
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
          <option value="User">User</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button onClick={handleSubmit} type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
