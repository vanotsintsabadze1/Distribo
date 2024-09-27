"use client";

import { Suspense, useEffect, useState } from "react";
import SingleCompanyOrderTypeSelector from "./SingleCompanyOrderTypeSelector";
import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import Spinner from "../ui/Spinner";
import SingleCompanyOrdersTable from "./SingleCompanyOrdersTable";

interface SingleCompanyOrdersWrapperProps {
  orders: Order[];
}

export default function SingleCompanyOrdersWrapper({ orders: defaultOrders }: SingleCompanyOrdersWrapperProps) {
  const [orderType, setOrderType] = useState<number>(0);
  const [orders, setOrders] = useState<Order[] | null>(defaultOrders);

  useEffect(() => {
    if (orderType === 0) {
      setOrders(defaultOrders);
      return;
    }

    async function revalidateOrders() {
      const res = await getCompanyOrders(orderType, 1);
      setOrders(res.data);
      return;
    }

    revalidateOrders();
  }, [orderType]);

  return (
    <Suspense fallback={<Spinner size={40} color="black" />}>
      <div className="mt-8 flex w-full flex-col items-end gap-4 px-4 md:w-[46rem]">
        {orders && (
          <>
            <SingleCompanyOrderTypeSelector setType={setOrderType} />
            {orders.length > 0 ? (
              <SingleCompanyOrdersTable orders={orders} />
            ) : (
              <div className="flex w-full items-center justify-center font-light uppercase tracking-wider text-gray-500">
                No Orders Found
              </div>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
}
