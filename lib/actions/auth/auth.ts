"use server";

import { API_URL } from "@/lib/constants/constants";
import { LoginData } from "@/types/schema-types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserToken } from "../helpers/getUserToken";
import { revalidateTag } from "next/cache";
import { encodeUserCredentials } from "../helpers/encodeUserCredentials";
import { Ok, Problem, InternalError } from "@/lib/utils/genericResponses";

// User login logic

export async function loginUser({ email, password }: LoginData) {
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

      const doEncodedCredentialsExist = cookies().get("e_creds")?.value != null;

      if (!doEncodedCredentialsExist) {
        const userInfo = await getUserAuthStatus();
        userInfo.data && (await encodeUserCredentials(userInfo.data));
      }

      return await Ok("Successfully logged the user");
    }

    return res.ok ? await Ok("Successfully logged the user") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}

// User logout logic

export async function logoutUser() {
  cookies().delete("user");
  cookies().delete("e_creds");
  revalidateTag("auth");
  return redirect("/auth/login");
}

// Get User information

export async function getUserAuthStatus() {
  const token = await getUserToken();

  if (!token) {
    return await Problem(401, "Unauthorized");
  }

  try {
    const res = await fetch(`${API_URL}/v1/User/GetCurrentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return res.ok ? await Ok(data, "Successfully fetched user") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}

// User Google autentication

export async function loginUserWithGoogle(code: string) {
  try {
    const res = await fetch(`${API_URL}/v1/User/google-redirect?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!data!.status) {
      // If status is not present in the response, it means that the user is authenticated
      cookies().set("user", data, {
        expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
      });
    }
    return res.ok ? await Ok("Successfully logged the user") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}

export async function confirmEmailAfterRegistration(token: string) {
  try {
    const res = await fetch(`${API_URL}/v1/User/RegistrationEmailConfirmation?token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return res.ok ? await Ok(data, "Successfully confirmed email") : await Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return await InternalError();
  }
}
