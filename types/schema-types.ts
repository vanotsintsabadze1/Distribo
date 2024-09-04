export type LoginData = {
  email: string;
  password: string;
};

export type LoginErrors = {
  email?: string[];
  password?: string[];
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpErrors = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type CreateCompanyData = {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyDescription: string;
  companyDocuments?: File[];
};

export type CreateCompanyErrors = {
  companyId?: string[];
  companyName?: string[];
  companyAddress?: string[];
  companyDescription?: string[];
  companyDocuments?: File[];
};

export type CreateUser = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type CreateUserError = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  role?: string[];
};

export type CreateProduct = {
  productName: string;
  description: string;
  price: number;
  stock: number;
};

export type CreateProductError = {
  productName?: string[];
  description?: string[];
  price?: number[];
  stock?: number[];
};
