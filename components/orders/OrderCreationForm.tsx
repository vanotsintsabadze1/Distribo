"use client";

import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrder } from "@/types/schema-types";
import { createOrderSchema } from "@/lib/schema/schema";
import { createOrder } from "@/lib/actions/orders/CreateOrder";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";

interface OrderCreationFormProps {
  productId: string;
}

export default function OrderCreationForm({ productId }: OrderCreationFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CreateOrder>({
    resolver: zodResolver(createOrderSchema),
  });

  async function onSubmit() {
    setLoading(true);

    // Calculate the deadline: 3 days from the current date in UTC
    const deadline = new Date();
    deadline.setUTCDate(deadline.getUTCDate() + 3);
    const quantity = getValues("quantity");

    const res = await createOrder({
      deliveryDateDeadline: deadline,
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
  }

  return (
    <form
      className="m-auto flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
