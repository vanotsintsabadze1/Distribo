import React from "react";
import Button from "../UI/Button";

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-3">
      <label>Email</label>
      <input type="email" className="rounded-md border border-solid p-2 pl-4" />
      <label>Password</label>
      <input
        type="password"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <label>Confirm Password</label>
      <input
        type="password"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <div className="flex justify-between">
        <Button type="submit" color="secondary" textColor="white" width="full">
          Sign up
        </Button>
      </div>
    </form>
  );
}
