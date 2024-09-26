"use client";
import { BookUser, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import SingleCompanyDetails from "./SingleCompanyDetails";

enum ActiveTab {
  Details,
  Orders,
}

interface SingleCompanyProps extends Company {
  children: React.ReactNode;
}

export default function SingleCompany({ children, ...company }: SingleCompanyProps) {
  const [active, setActive] = useState(ActiveTab.Details);

  return (
    <>
      <section className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          onClick={() => setActive(ActiveTab.Details)}
          className={`flex items-center justify-center gap-1 rounded-md bg-gray-200/50 transition-opacity duration-200 ease-in-out ${active === ActiveTab.Details ? "opacity-100" : "opacity-50"} px-4 py-2 shadow-sm`}
        >
          <BookUser size={15} />
          <span className="text-xs font-bold">Details</span>
        </button>
        <button
          onClick={() => setActive(ActiveTab.Orders)}
          className={`flex items-center justify-center gap-1 rounded-md bg-gray-200/50 transition-opacity duration-200 ease-in-out ${active === ActiveTab.Orders ? "opacity-100" : "opacity-50"} px-4 py-2 shadow-sm`}
        >
          <ArrowUpDown size={15} />
          <span className="text-xs font-bold">Orders</span>
        </button>
      </section>
      {active === ActiveTab.Details ? <SingleCompanyDetails {...company} /> : children}
    </>
  );
}
