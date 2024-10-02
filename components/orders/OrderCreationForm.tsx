"use client";

import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrder } from "@/types/schema-types";
import { createOrderSchema } from "@/lib/schema/schema";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { useRouter } from "next/navigation";
import DatePickerComp from "../ui/DatePickerComp";
import { createOrder } from "@/lib/actions/orders/createOder";

interface OrderCreationFormProps {
  productId: string;
}

export default function OrderCreationForm({ productId }: OrderCreationFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<CreateOrder>({
    resolver: zodResolver(createOrderSchema),
  });
  const router = useRouter();

  async function onSubmit(orderData: CreateOrder) {
    setLoading(true);
    const { deliveryDateDeadline, quantity } = orderData;

    const res = await createOrder({
      deliveryDateDeadline,
      items: [
        {
          productId,
          quantity,
        },
      ],
    });

    await apiResponseValidator({
      res,
      options: {
        customErrors: {
          200: "Order completed!",
          400:
            res.message === "NotEnoughStock"
              ? "There is not enough stock"
              : res.message === "UserHasNotCompany"
                ? "User has not company"
                : "Bad request",
        },
      },
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
      <Controller
        control={control}
        name="deliveryDateDeadline"
        render={({ field }) => (
          <DatePickerComp
            setDeadlineDate={(date) => field.onChange(date?.toISOString() || "")}
            errorMessage={errors.deliveryDateDeadline || null}
          />
        )}
      />
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
