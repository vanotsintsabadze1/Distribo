import { type Row, type Table } from "@tanstack/react-table";
import { OrderType } from "@/lib/constants/constants";
import Button from "../ui/Button";
import { Check, X } from "lucide-react";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { rejectOrder } from "@/lib/actions/orders/rejectOrder";
import { approveOrder } from "@/lib/actions/orders/approveOrder";
import { useRouter } from "next/navigation";

interface SingleCompanyOrderActions {
  table: Table<Order>;
  row: Row<Order>;
}

enum ErrorTypes {
  OrderNotPending = "OrderNotPending",
  OrderStockMismatch = "OrderStockMismatch",
}

export default function AdminOrderActions({ table, row }: SingleCompanyOrderActions) {
  const [isRejectedLoading, setIsRejectedLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const router = useRouter();

  async function onOrderReject(id: string) {
    setIsRejectedLoading(true);
    const res = await rejectOrder(id);
    await apiResponseValidator({
      res,
      options: {
        customErrors: {
          200: "Successfully rejected the order",
        },
      },
    });

    setIsRejectedLoading(false);
    router.refresh();
  }

  async function onOrderApprove(id: string) {
    setIsApproveLoading(true);
    const res = await approveOrder(id);
    await apiResponseValidator({
      res,
      options: {
        customErrors: {
          200: "Successfully approved the order",
          404: "Order not found",
          400:
            res.message === ErrorTypes.OrderNotPending
              ? "Order is not pending"
              : res.message === ErrorTypes.OrderStockMismatch
                ? "Order stock is mismatch"
                : "Bad request",
          409: "This order has changed by parallel user and you’re changes were not affected.",
        },
      },
    });

    setIsApproveLoading(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Button
        disabled={table.getRow(row.id).getAllCells()[5].getValue() !== OrderType.Pending}
        className={`flex h-7 w-24 items-center justify-center gap-1 bg-green-600 ${table.getRow(row.id).getAllCells()[5].getValue() !== OrderType.Pending && "cursor-not-allowed opacity-50"} px-2 text-xs font-medium text-white`}
        onClick={() => onOrderApprove(table.getRow(row.id).getAllCells()[0].getValue() as string)}
      >
        {isApproveLoading ? (
          <Spinner size={15} color="white" />
        ) : (
          <>
            <Check size={25} strokeWidth={3} className="mb-[1.5px] text-white" />
            Approve
          </>
        )}
      </Button>
      <Button
        disabled={table.getRow(row.id).getAllCells()[5].getValue() !== OrderType.Pending}
        className={`flex h-7 w-24 items-center justify-center gap-1 bg-red-600 ${table.getRow(row.id).getAllCells()[5].getValue() !== OrderType.Pending && "cursor-not-allowed opacity-50"} px-2 text-xs font-medium text-white`}
        onClick={() => onOrderReject(table.getRow(row.id).getAllCells()[0].getValue() as string)}
      >
        {isRejectedLoading ? (
          <Spinner size={15} color="white" />
        ) : (
          <>
            <X size={15} strokeWidth={3} className="mb-[1.5px] text-white" />
            Reject
          </>
        )}
      </Button>
    </div>
  );
}
