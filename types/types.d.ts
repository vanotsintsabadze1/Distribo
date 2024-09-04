interface UserCreationPayload {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface ServerActionResponsePayload {
  status: number;
  message: string;
  data?: any;
}
