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
    <div className="flex w-28 items-center justify-between px-4">
      <span>{stock}</span>
      <Pencil size={20} className="cursor-pointer" onClick={navigateOnProductStockUpdatePage} />
    </div>
  );
}
