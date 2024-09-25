"use client";

import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrder } from "@/types/schema-types";
import { createOrderSchema } from "@/lib/schema/schema";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { createOrder } from "@/lib/actions/orders/createOrder";
import { useRouter } from "next/navigation";
import DatePickerComp from "../ui/DatePickerComp";

interface OrderCreationFormProps {
  productId: string;
}

export default function OrderCreationForm({ productId }: OrderCreationFormProps) {
  const [loading, setLoading] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<CreateOrder>({
    resolver: zodResolver(createOrderSchema),
  });
  const router = useRouter();

  async function onSubmit() {
    if (deadlineDate === null) {
      setErrorMessage("Deadline date is required");
      return;
    }
    setLoading(true);

    const quantity = getValues("quantity");

    const res = await createOrder({
      deliveryDateDeadline: deadlineDate,
      items: [
        {
          productId,
          quantity,
        },
      ],
    });
    await apiResponseValidator({
      res,
      options: { customErrors: { 200: "Order completed!", 400: res.message } },
    });

    setLoading(false);
    if (res.status === 200) {
      router.push("/dashboard/products");
      router.refresh();
    }
  }

  return (
    <form
      className="m-auto flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DatePickerComp setDeadlineDate={setDeadlineDate} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <TextInput
        label="Quantity"
        type="number"
        name="quantity"
        placeholder="e.g 10"
        register={register}
        error={errors.quantity}
      />
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
