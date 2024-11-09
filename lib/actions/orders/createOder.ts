"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function createOrder(orderItems: OrderCreationPayload) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderItems),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      return await Problem(res.status, errorResponse.message);
    }

    return await Ok("Successfully created the order");
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
