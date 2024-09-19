"use server";

import { cookies } from "next/headers";


export async function encodeUserCredentials(creds: User) {
    const stringifiedInfo = JSON.stringify(creds);
    const encodedInfo = Buffer.from(stringifiedInfo, "utf-8").toString('base64');

    cookies().set("e_creds", encodedInfo);
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