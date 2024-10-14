export const API_URL = process.env.NEXT_PUBLIC_API_ADDRESS;
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const LOCAL_TZ = "Asia/Tbilisi";
export const DEFAULT_ORDER_COUNT = 10;

export enum OrderType {
  Pending,
  Rejected,
  Approved,
}

export enum UserRole {
  RootUser = "RootUser",
  User = "User",
  Employee = "Employee",
  Admin = "Admin",
}
