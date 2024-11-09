import { API_URL } from "@/lib/constants/constants";
import { InternalError, Ok, Problem } from "@/lib/utils/genericResponses";

export async function getProductById(productId: string) {
  try {
    const res = await fetch(`${API_URL}/v1/Product/${productId}`, { cache: "no-cache" });

    const data = await res.json();

    return res.ok ? await Ok(data, "Successfully fetched the product") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
