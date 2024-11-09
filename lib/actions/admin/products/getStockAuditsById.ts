"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function getStockAuditsById(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/StockChanges/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data = await res.json();

    return res.ok ? await Ok(data, "Successfully fetched the stock audits") : await Problem(res.status, data.message);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
