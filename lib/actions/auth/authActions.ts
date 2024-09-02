"use server";

import { API_URL } from "@/lib/constants/constants";
import { LoginData } from "@/types/schema-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserToken } from "../helpers/getUserToken";

// User login logic

export async function loginAction({ email, password }: LoginData) {
  if (!email || !password) {
    return { status: 400, message: "Please fill all fields." };
  }

  try {
    const res = await fetch(`${API_URL}/v1/User/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      cookies().set("user", data, {
        expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
      });
      return { status: 200, message: "Logged in successfully." };
    }

    if (!res.ok) {
      return { status: res.status, message: "Invalid Credentials" };
    }
  } catch (error) {
    return { status: 500, message: "Something went wrong!" };
  }
}

// User logout logic

export async function logoutAction() {
  cookies().delete("user");
  return redirect("/auth/login");
}

// Get User information

export async function getUserInfoAction() {
  const token = await getUserToken();
  try {
    const res = await fetch(`${API_URL}/v1/User/GetCurrentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const userData = await res.json();
      return userData;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    return console.log(error);
  }
}

// User Google autentication

export async function googleAuthenticationAction(code: string) {
  console.log("🚀 ~ googleAuthenticationAction ~ code:", code);
  try {
    const res = await fetch(`${API_URL}/v1/User/google-redirect?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("🚀 ~ googleAuthenticationAction ~ API_URL:", API_URL);
    console.log("🚀 ~ googleAuthenticationAction ~ res:", res);

    const data = await res.json();
    console.log("🚀 ~ cookies ~ data:", data);

    cookies().set("user", data, {
      expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
    });
  } catch (error) {
    return { status: 500, message: "Something went wrong!" };
  }
}
