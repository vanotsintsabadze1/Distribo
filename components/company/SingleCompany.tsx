"use client";
import Image from "next/image";
import { BookUser, ArrowUpDown } from "lucide-react";
import { useState } from "react";

enum ActiveTab {
  Details,
  Orders,
}

export default function SingleCompany() {
  const [active, setActive] = useState(ActiveTab.Details);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center">
        <div className="border-green relative h-32 w-32 rounded-full border-2 border-black">
          <Image
            src={"https://placehold.co/600x400/000000/FFFFFF/png"}
            alt="company-profile-picture"
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-2">
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
      </div>
    </div>
  );
}
