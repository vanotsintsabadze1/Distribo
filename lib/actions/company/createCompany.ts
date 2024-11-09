"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function createCompany({
  name,
  address,
  phone,
  email,
}: {
  name: string;
  address: string;
  phone: string;
  email: string;
}) {
  const token = await getUserToken();
  try {
    const res = await fetch(`${API_URL}/v1/Company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        address,
        phone,
        email,
      }),
    });

    const data = await res.json();
    const code = data.Code ?? null;

    return res.ok ? await Ok(code, "Successfully created the company") : await Problem(res.status, code);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
