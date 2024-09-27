"use client";

import { ChevronDownIcon } from "lucide-react";
import { Portal, Select } from "@ark-ui/react";
import { OrderType } from "@/lib/constants/constants";

interface SingleCompanyOrderTypeSelectorProps {
  setType: React.Dispatch<React.SetStateAction<OrderType>>;
}

export default function SingleCompanyOrderTypeSelector({ setType }: SingleCompanyOrderTypeSelectorProps) {
  const selectItems = ["Pending", "Confirmed", "Rejected"];

  return (
    <Select.Root items={selectItems} className="flex flex-col gap-2 text-xs" positioning={{ placement: "bottom" }}>
      <Select.Label className="text-right text-[.6rem] font-bold uppercase">Order Type</Select.Label>
      <Select.Control className="flex h-8 w-28 items-center justify-center rounded-md bg-tertiary">
        <Select.Trigger className="flex items-center justify-center">
          <Select.ValueText placeholder="Select Type" className="font-medium" />
          <Select.Indicator>
            <ChevronDownIcon size={17} />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner className="mt-1 w-28 rounded-md bg-tertiary text-xs shadow-sm">
          <Select.Content>
            <Select.ItemGroup className="">
              {selectItems.map((item) => (
                <Select.Item
                  key={item}
                  item={item}
                  onClick={() => setType(OrderType[item as keyof typeof OrderType])}
                  className="cursor-pointer rounded-md py-3 text-center text-[.7rem] font-bold uppercase hover:bg-gray-100"
                >
                  <Select.ItemText>
                    {item === "Pending" ? "⏳ Pending" : item === "Confirmed" ? "✅ Confirmed" : "❌ Rejected"}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  );
}
