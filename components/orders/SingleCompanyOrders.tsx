import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import SingleCompanyOrdersWrapper from "./SingleCompanyOrdersWrapper";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";

export default async function SingleCompanyOrders() {
  const orders = await getCompanyOrders(0, 1, 10);
  const role = await getUserRole();

  return <SingleCompanyOrdersWrapper orders={orders.data} role={role} />;
}
