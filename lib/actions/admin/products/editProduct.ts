"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function editProduct(formData: FormData) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log(res);

    return res.ok
      ? { status: 200, message: "Product updated successfully" }
      : { status: 400, message: "Failed to update product" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}
