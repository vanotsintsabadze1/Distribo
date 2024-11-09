"use server";

import { API_URL, UserRole } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { getUserRole } from "../helpers/encodeUserCredentials";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function getAllCompaniesOrders(status: number, page: number, pageSize: number) {
  const token = await getUserToken();
  const role = await getUserRole();

  if (role === UserRole.User || role === UserRole.RootUser) {
    return { status: 403, message: "Forbidden", data: null };
  }

  try {
    const res = await fetch(`${API_URL}/v1/Order/ByStatus/${status}/${page}?pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();

    return res.ok
      ? await Ok(data, "Successfully fetched all companies orders")
      : await Problem(res.status, data.message);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
