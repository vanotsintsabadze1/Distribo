"use client";

import { deleteProduct } from "@/lib/actions/admin/products/deleteProduct";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { Trash2Icon, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductActionsBarProps {
  productId: string;
}

export default function ProductActionsBar({ productId }: ProductActionsBarProps) {
  const router = useRouter();

  function handleEdit() {
    router.push(`/dashboard/products/edit/${productId}`);
  }

  async function handleDelete() {
    const res = await deleteProduct(productId);
    await apiResponseValidator({ res });
  }

  return (
    <div className="absolute right-0 top-0 flex items-center justify-center gap-2 rounded-lg bg-black/60 px-2 py-1">
      <button onClick={handleEdit}>
        <Edit size={17} className="text-white opacity-60 duration-200 ease-in-out hover:opacity-100" />
      </button>
      <button onClick={handleDelete}>
        <Trash2Icon size={17} className="text-white opacity-60 duration-200 ease-in-out hover:opacity-100" />
      </button>
    </div>
  );
}
