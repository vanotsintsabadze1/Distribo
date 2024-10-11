interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  role: {
    name: "Admin" | "User" | "Employee";
  };
}

interface UserCreationPayload {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface OrderItem {
  productId: string;
  quantity: number | string;
}

interface OrderCreationPayload {
  deliveryDateDeadline: DatePickerValueChangeDetails;
  items: OrderItem[];
}

interface ServerActionResponsePayload {
  status: number;
  message: string;
  data?: any;
}

interface ImageResponsePayload {
  base64?: string;
  url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ImageResponsePayload[];
}

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Order {
  id: string;
  createdAtUtc: Date;
  deliveryDateDeadline: Date;
  status: number;
  productImageUrl: string;
  productName: string;
  companyName: string;
}

interface OrderPayload {
  orders: Order[];
  totalCount: number;
}
