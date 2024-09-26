"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";

export async function getCompanyOrders(status: number, page: number) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order/CompaniesByStatus/${status}/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const orders = data.orders ? data.orders : null;

    return res.ok
      ? { status: 200, message: "Successfully got the company orders", data: orders }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
