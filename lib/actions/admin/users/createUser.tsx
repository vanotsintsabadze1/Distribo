"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function createUser(userInformation: UserCreationPayload) {
  console.log("🚀 ~ createUser ~ userInformation:", userInformation);
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

    console.log(res);

    if (res.ok) {
      return { status: 200, message: "User created successfully." };
    } else {
      throw new Error("User creation failed.");
    }
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong" };
  }
}
