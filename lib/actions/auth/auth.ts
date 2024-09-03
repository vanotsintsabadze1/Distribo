"use server";

import { API_URL } from "@/lib/constants/constants";
import { LoginData } from "@/types/schema-types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserToken } from "../helpers/getUserToken";

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

export async function logoutUser() {
  cookies().delete("user");
  return redirect("/auth/login");
}

// Get User information

export async function getUserAuthStatus() {
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
      throw new Error("Something went wrong while trying to get user authentication status!");
    }
  } catch (error) {
    return console.log(error);
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
    } else {
      throw new Error("Something went wrong while trying to login with Google!");
    }
  } catch (error) {
    return { message: error };
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

    if (res.ok) {
      return { status: 200, message: "Email confirmed successfully." };
    } else {
      throw new Error("Email confirmation failed.");
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Something went wrong!" };
  }
}
