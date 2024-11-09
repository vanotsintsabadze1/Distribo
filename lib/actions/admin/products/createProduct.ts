"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function createProduct(formData: FormData) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res.ok ? await Ok("Successfully created the product") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
