"use server";

import { API_URL } from "@/lib/constants/constants";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/v1/Product`, {
      cache: "no-cache",
    });

    const data = await res.json();

    return res.ok ? await Ok(data, "Successfully fetched all products") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
