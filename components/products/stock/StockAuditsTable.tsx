"use client";

import { LOCAL_TZ } from "@/lib/constants/constants";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { format, toZonedTime } from "date-fns-tz";

interface StockAuditsPageProps {
  stockAudits: StockAudits[];
}

const columnHelper = createColumnHelper<StockAudits>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableHiding: true,
    meta: { isVisible: false },
  }),
  columnHelper.accessor("userEmail", {
    header: "Staff",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("oldValue", {
    header: "Old Value",
    cell: (info) => <span>kg {info.getValue()}</span>,
  }),
  columnHelper.accessor("newValue", {
    header: "New Value",
    cell: (info) => <span>kg {info.getValue()}</span>,
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Update Date",
    cell: (info) => format(toZonedTime(info.getValue(), LOCAL_TZ), "dd-LL-yyyy HH:mm"),
  }),
];

export default function StockAuditsTable({ stockAudits }: StockAuditsPageProps) {
  const table = useReactTable({
    data: stockAudits as StockAudits[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { id: false },
    },
  });
  return (
    <div className="mt-6 flex w-full items-center overflow-auto rounded-lg border md:overflow-visible">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b text-left text-gray-500">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-rigt max-w-28 truncate p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
