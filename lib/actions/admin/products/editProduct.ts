"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function editProduct(formData: FormData, id: string) {
  console.log("🚀 ~ editProduct ~ formData:", formData)
  const token = await getUserToken();
  console.log("🚀 ~ editProduct ~ token:", token)

  try {
    
    const res = await fetch(`${API_URL}/v1/Product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log("🚀 ~ editProduct ~ res:", res)

    return res.ok
      ? { status: 200, message: "Product updated successfully" }
      : { status: 400, message: "Failed to update product" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}
