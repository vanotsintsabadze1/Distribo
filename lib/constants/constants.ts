export const API_URL = process.env.NEXT_PUBLIC_API_ADDRESS;
export const LOCAL_TZ = "Asia/Tbilisi";

export enum OrderType {
  Pending,
  Rejected,
  Approved,
}
