import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface EditProductStockActionProps {
  stock: number;
  productId: string;
}

export default function EditProductStockAction({ stock, productId }: EditProductStockActionProps) {
  const router = useRouter();

  function navigateOnProductStockUpdatePage() {
    router.push(`/dashboard/products/${productId}/update-stock`);
  }
  return (
    <div className="flex w-32 items-center justify-between px-4">
      <span>{stock}</span>
      <button
        onClick={navigateOnProductStockUpdatePage}
        className="cursor-pointer rounded-md p-3 text-black duration-200 ease-in-out hover:bg-gray-100"
      >
        <Pencil size={20} />
      </button>
    </div>
  );
}
