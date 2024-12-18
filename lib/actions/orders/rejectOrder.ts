"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function rejectOrder(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order/Reject?id=${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok ? await Ok("Successfully rejected the order") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
