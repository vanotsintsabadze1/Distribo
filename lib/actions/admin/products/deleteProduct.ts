"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { revalidatePath } from "next/cache";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function deleteProduct(productId: string) {
  revalidatePath("/dashboard/products");
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    return res.ok ? await Ok("Successfully deleted the product") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
