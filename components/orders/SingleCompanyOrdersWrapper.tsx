"use client";

import { Suspense, useEffect, useState } from "react";
import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import SingleCompanyOrdersTable from "./SingleCompanyOrdersTable";
import { getAllCompaniesOrders } from "@/lib/actions/orders/getAllCompaniesOrders";
import SingleCompanyOrderTypeSelector from "./SingleCompanyOrderTypeSelector";
import Spinner from "../ui/Spinner";

interface SingleCompanyOrdersWrapperProps {
  orders: Order[];
  role: string | null;
}

export default function SingleCompanyOrdersWrapper({ orders: defaultOrders, role }: SingleCompanyOrdersWrapperProps) {
  const [orderType, setOrderType] = useState<number>(0);
  const [orders, setOrders] = useState<Order[] | null>(defaultOrders);

  useEffect(() => {
    if (orderType === 0) {
      setOrders(defaultOrders);
    }

    async function userRevalidateOrders() {
      const res = await getCompanyOrders(orderType, 1, 10);
      setOrders(res.data);
      return;
    }

    async function adminRevalidateOrders() {
      const res = await getAllCompaniesOrders(orderType, 1, 10);
      setOrders(res.data);
      return;
    }

    if (role === "User") {
      userRevalidateOrders();
    } else {
      adminRevalidateOrders();
    }
  }, [orderType, role, defaultOrders]);

  return (
    <Suspense fallback={<Spinner size={40} color="black" />}>
      <div className="m-auto mt-8 flex w-full flex-col items-end gap-4 px-4 md:w-[46rem]">
        {orders && (
          <>
            <SingleCompanyOrderTypeSelector setType={setOrderType} />
            {orders.length > 0 ? (
              <SingleCompanyOrdersTable orders={orders} role={role} />
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
