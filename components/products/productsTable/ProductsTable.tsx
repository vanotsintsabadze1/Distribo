"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import AdminProductActions from "./AdminProductActions";
import ProductThumbnail from "./ProductThumbnail";
import EditProductStockAction from "./EditProductStockAction";

interface ProductsWrapperProps {
  products: Product[] | null;
  role: string | null;
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableHiding: true,
    meta: { isVisible: false },
  }),
  columnHelper.accessor("images", {
    header: "Image",
    cell: (info) => <ProductThumbnail images={info.getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("stock", {
    header: "Current Stock",
    cell: (info) => (
      <EditProductStockAction stock={info.getValue()} productId={info.row.original.id}/>
    ),
  }),
];

export default function ProductsTable({ products, role }: ProductsWrapperProps) {
  const table = useReactTable({
    data: products as Product[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { id: false },
    },
  });

  return (
    <div className="mt-6 flex w-full items-center overflow-auto rounded-lg border p-2 text-lg md:overflow-visible">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="rounded-md text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th className="px-10 py-2">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-rigt max-w-28 truncate py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="max-w-28 truncate px-2 py-2">
                {role === "Admin" && <AdminProductActions table={table} row={row} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
