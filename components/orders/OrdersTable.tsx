"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { format, toZonedTime } from "date-fns-tz";
import { LOCAL_TZ, OrderType } from "@/lib/constants/constants";
import SingleCompanyOrderCancellationButton from "./SingleCompanyOrderCancellationButton";
import AdminOrderActions from "./AdminOrderActions";
import OrderCellImage from "./OrderCellImage";

interface OrdersTableProps {
  orders: Order[];
  role: string | null;
}

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableHiding: true,
    meta: { isVisible: false },
  }),
  columnHelper.accessor("productImageUrl", {
    header: "IMAGE",
    cell: (info) => <OrderCellImage imageUrl={info.getValue()} />,
  }),
  columnHelper.accessor("productName", {
    header: "PRODUCT",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("companyName", {
    header: "COMPANY",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Created At",
    cell: (info) => format(toZonedTime(info.getValue(), LOCAL_TZ), "dd-LL-yyyy HH:mm"),
  }),
  columnHelper.accessor("deliveryDateDeadline", {
    header: "Delivery Date",
    cell: (info) => format(toZonedTime(info.getValue(), LOCAL_TZ), "dd-LL-yyyy HH:mm"),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span>
        {info.getValue() === OrderType.Pending
          ? "⏳ Pending"
          : info.getValue() === OrderType.Approved
            ? "✅ Approved"
            : "❌ Rejected  "}
      </span>
    ),
  }),
];

export default function OrdersTable({ orders, role }: OrdersTableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { id: false },
    },
  });

  return (
    <div className="flex w-full items-center overflow-auto text-xs md:justify-center md:overflow-visible">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="whitespace-nowrap rounded-md bg-tertiary">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-8 py-2 uppercase">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th className="px-10 py-2 uppercase">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="max-w-28 truncate border border-gray-200 px-2 py-2 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="max-w-28 truncate border border-gray-200 px-2 py-2">
                {role === "User" ? (
                  <SingleCompanyOrderCancellationButton table={table} row={row} />
                ) : (
                  <AdminOrderActions table={table} row={row} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
