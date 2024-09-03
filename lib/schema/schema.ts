import { z, ZodType } from "zod";
import { CreateCompanyData, LoginData, SignUpData, CreateUser } from "@/types/schema-types";

export const loginFormSchema: ZodType<LoginData> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const signUpFormSchema: ZodType<SignUpData> = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string().min(1, { message: "" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createCompanyFormSchema: ZodType<CreateCompanyData> = z.object({
  companyId: z.string().min(1, { message: "Company ID is required" }).max(20, { message: "Company ID is too long" }),
  companyName: z
    .string()
    .min(1, { message: "Company Name is required" })
    .max(50, { message: "Company Name is too long" }),
  companyPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  companyDescription: z
    .string()
    .min(10, { message: "Description is too short" })
    .max(500, { message: "Description is too long" }),
  companyDocuments: z.array(z.instanceof(File)).optional(),
});

export const createUserSchema: ZodType<CreateUser> = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string().min(8),

    role: z.enum(["User", "Admin"]),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    // By doing this we can access the password and confirmPassword fields and compare them to each other.
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
