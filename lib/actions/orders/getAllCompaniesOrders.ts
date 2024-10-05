"use server";

import { API_URL, UserRole } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { getUserRole } from "../helpers/encodeUserCredentials";

export async function getAllCompaniesOrders(status: number, page: number, pageSize: number) {
  const token = await getUserToken();
  const role = await getUserRole();

  if (role === UserRole.User) {
    return { status: 403, message: "Forbidden", data: null }
  }

  try {
    const res = await fetch(`${API_URL}/v1/Order/ByStatus/${status}/${page}?pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const data = await res.json();
    const orders = data.orders ? data.orders : null;

    return res.ok
      ? { status: 200, message: "Successfully got the companies orders", data: orders }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
