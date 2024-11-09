"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function approveOrder(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order/Approve?id=${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const errorResponse = await res.json();

    return res.ok
      ? await Ok(errorResponse, "Successfully approved the order")
      : await Problem(res.status, errorResponse.message);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
