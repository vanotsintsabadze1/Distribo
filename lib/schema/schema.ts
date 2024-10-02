import { z, ZodType } from "zod";
import {
  CreateCompanyData,
  LoginData,
  SignUpData,
  CreateUser,
  CreateProduct,
  ProfileSchema,
  CreateOrder,
} from "@/types/schema-types";

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
  // companyId: z.string().length(9, { message: "Company ID number must be exactly 9 characters long" }),
  companyName: z
    .string()
    .min(1, { message: "Company Name is required" })
    .max(50, { message: "Company Name is too long" }),
  companyAddress: z
    .string()
    .min(1, { message: "Company Address is required" })
    .max(50, { message: "Company Address is too long" }),
  companyPhone: z.string().min(1),
  companyEmail: z.string().email({ message: "Invalid email address" }),
  // companyDescription: z
  //   .string()
  //   .min(10, { message: "Description is too short" })
  //   .max(500, { message: "Description is too long" }),
  // companyDocuments: z.array(z.instanceof(File)).optional(),
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

    role: z.enum(["User", "Employee"]),
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

export const createProductSchema: ZodType<CreateProduct> = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name is too long" }),
  description: z
    .string()
    .min(8, { message: "Description must be at least 8 characters long" })
    .max(500, { message: "Description is too long" }),
  price: z.number().positive({ message: "Price must be greater than 0" }),
  stock: z.number().nonnegative({ message: "Stock must be a positive number" }),
});

export const createOrderSchema: ZodType<CreateOrder> = z.object({
  deliveryDateDeadline: z
    .string({
      required_error: "Delivery deadline date is required",
    })
    .datetime({ offset: true, message: "Delivery deadline date is required" }),
  quantity: z
    .number({
      invalid_type_error: "Quantity is required",
    })
    .positive({ message: "Quantity must be greater than 0" }),
});

export const profileSchema: ZodType<Partial<ProfileSchema>> = z
  .object({
    email: z.string(),
    role: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .partial();
