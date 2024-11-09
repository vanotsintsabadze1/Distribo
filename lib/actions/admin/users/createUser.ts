"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { CreateCompanyUser } from "@/types/schema-types";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

export async function createUser(userInformation: UserCreationPayload) {
  const { email, password, role } = userInformation;
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/User/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, role }),
    });

    return res.ok ? await Ok("Successfully created the user") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}

export async function createCompanyUser(userInformation: CreateCompanyUser) {
  const { email, password } = userInformation;
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/User/RegisterForCompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });

    return res.ok ? await Ok("Successfully created the user") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
