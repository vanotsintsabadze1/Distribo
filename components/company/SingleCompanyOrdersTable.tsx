"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { LOCAL_TZ, OrderType } from "@/lib/constants/constants";
import Button from "../ui/Button";
import { Trash2Icon } from "lucide-react";

interface SingleCompanyOrdersTableProps {
  orders: Order[];
}

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
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
          : info.getValue() === OrderType.Confirmed
            ? "✅ Confirmed"
            : "❌ Rejected  "}
      </span>
    ),
  }),
];

export default function SingleCompanyOrdersTable({ orders: defaultOrders }: SingleCompanyOrdersTableProps) {
  const [orders, setOrders] = useState(() => [...defaultOrders]);

  console.log(orders);
  const table = useReactTable({ data: orders, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="flex w-full items-center overflow-auto text-xs md:justify-center md:overflow-visible">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="whitespace-nowrap rounded-md bg-tertiary">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-10 py-2 uppercase">
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
                <div className="flex w-full items-center justify-center">
                  <Button className="text- flex items-center justify-center gap-1 bg-red-600 px-3 py-1 font-medium text-white">
                    <Trash2Icon size={15} className="mb-[1.5px] text-white" />
                    Cancel
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
