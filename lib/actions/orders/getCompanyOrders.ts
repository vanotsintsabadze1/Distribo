"use server";

import { API_URL, UserRole } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { getUserRole } from "../helpers/encodeUserCredentials";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function getCompanyOrders(status: number, page: number, pageSize: number) {
  const token = await getUserToken();

  const role = await getUserRole();

  if (role === UserRole.Admin || role === UserRole.Employee) {
    return await Problem(403, "Forbidden");
  }

  try {
    const res = await fetch(`${API_URL}/v1/Order/CompaniesByStatus/${status}/${page}?pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const data: OrderPayload | null = await res.json();

    return res.ok
      ? await Ok(data, "Successfully fetched all companies orders")
      : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
