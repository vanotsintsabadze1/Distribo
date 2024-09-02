"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserCreationNavigatorButton() {
  const router = useRouter();

  function navigateToUserCreation() {
    router.push("/dashboard/users/create");
  }

  return (
    <button
      onClick={navigateToUserCreation}
      className="font-meidum flex items-center justify-center gap-0.5 rounded-md bg-secondary px-4 py-2 text-sm text-white"
    >
      <Plus size={17} color="white" />
      Create User
    </button>
  );
}
