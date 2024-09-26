"use client";

import { Suspense, useEffect, useState } from "react";
import SingleCompanyOrderTypeSelector from "./SingleCompanyOrderTypeSelector";
import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import Spinner from "../ui/Spinner";

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
      <div className="flex w-full flex-col items-end gap-4 px-4 md:w-[40rem]">
        <SingleCompanyOrderTypeSelector setType={setOrderType} />
      </div>
    </Suspense>
  );
}
