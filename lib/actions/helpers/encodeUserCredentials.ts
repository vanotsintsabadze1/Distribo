"use server";

import { cookies } from "next/headers";

const domain = process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost";

export async function encodeUserCredentials(creds: User) {
  const stringifiedInfo = JSON.stringify(creds);
  const encodedInfo = Buffer.from(stringifiedInfo, "utf-8").toString("base64");

  cookies().set("e_creds", encodedInfo, {
    expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    domain: domain as string,
  });
}

export async function decodeUserCredentials(creds: string) {
  const decodedInfo = Buffer.from(creds, "base64").toString("utf-8");

  return JSON.parse(decodedInfo) as User;
}

export async function getUserRole() {
  const creds = cookies().get("e_creds")?.value;

  if (!creds) {
    return null;
  }

  const dCreds = await decodeUserCredentials(creds);
  return dCreds.role.name;
}
