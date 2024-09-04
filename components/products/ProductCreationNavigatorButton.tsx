"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCreationNavigatorButton() {
  const router = useRouter();

  function navigateToProductCreation() {
    router.push("/dashboard/products/create");
  }

  return (
    <button
      onClick={navigateToProductCreation}
      className="font-meidum flex items-center justify-center gap-0.5 rounded-md bg-secondary px-4 py-2 text-sm text-white"
    >
      <Plus size={17} color="white" />
      Create Product
    </button>
  );
}
