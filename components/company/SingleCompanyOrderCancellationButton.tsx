import { useState } from "react";
import { cancelOrder } from "@/lib/actions/orders/cancelOrder";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { type Row, type Table } from "@tanstack/react-table";
import { OrderType } from "@/lib/constants/constants";
import Button from "../ui/Button";
import { Trash2Icon } from "lucide-react";
import Spinner from "../ui/Spinner";

interface SingleCompanyOrderCancellationButtonProps {
  table: Table<Order>;
  row: Row<Order>;
}

export default function SingleCompanyOrderCancellationButton({
  table,
  row,
}: SingleCompanyOrderCancellationButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onOrderCancel(id: string) {
    setLoading(true);
    const res = await cancelOrder(id);
    const success = await apiResponseValidator({
      res,
      options: { customErrors: { 200: "Successfully cancelled the order" } },
    });

    if (success) {
      window.location.reload();
    }

    setLoading(false);
  }

  return (
    <Button
      disabled={table.getRow(row.id).getAllCells()[3].getValue() !== OrderType.Pending}
      className={`flex h-7 w-24 items-center justify-center gap-1 bg-red-600 ${table.getRow(row.id).getAllCells()[3].getValue() !== OrderType.Pending && "cursor-not-allowed opacity-50"} px-2 text-xs font-medium text-white`}
      onClick={() => onOrderCancel(table.getRow(row.id).getAllCells()[0].getValue() as string)}
    >
      {!loading ? (
        <>
          <Trash2Icon size={15} className="mb-[1.5px] text-white" />
          Cancel
        </>
      ) : (
        <Spinner size={15} color="white" />
      )}
    </Button>
  );
}
