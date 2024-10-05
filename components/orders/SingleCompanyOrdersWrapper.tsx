import SingleCompanyOrdersTable from "./SingleCompanyOrdersTable";
import SingleCompanyOrderTypeSelector from "./SingleCompanyOrderTypeSelector";
import OrderPageCell from "./OrderPageCell";

interface SingleCompanyOrdersWrapperProps {
  orders: OrderPayload | null;
  page: number;
  role: string | null;
}

export default function SingleCompanyOrdersWrapper({ orders, role, page }: SingleCompanyOrdersWrapperProps) {
  const pageCount = orders?.totalCount && Math.ceil(orders?.totalCount / 10);

  return (
    <div className="m-auto mb-10 mt-8 flex w-full flex-col items-end gap-4 px-4 md:w-[46rem]">
      {orders ? (
        <>
          <SingleCompanyOrderTypeSelector />
          {orders.orders.length > 0 ? (
            <SingleCompanyOrdersTable orders={orders.orders} role={role} />
          ) : (
            <div className="flex w-full items-center justify-center font-light uppercase tracking-wider text-gray-500">
              No Orders Found
            </div>
          )}
          <div className="flex w-full flex-wrap items-center justify-center gap-2 gap-y-4 px-4">
            {orders.totalCount < 10 && orders.totalCount !== 0 ? (
              <OrderPageCell cell={1} currentPage={page} />
            ) : (
              Array(pageCount)
                .fill(0)
                .map((_, idx) => <OrderPageCell key={idx} cell={idx + 1} currentPage={page} />)
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-center font-light uppercase tracking-wider text-gray-500">
          Failed to load orders..
        </div>
      )}
    </div>
  );
}
