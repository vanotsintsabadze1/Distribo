import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import SingleCompanyOrdersWrapper from "./SingleCompanyOrdersWrapper";

export default async function SingleCompanyOrders() {
  const orders = await getCompanyOrders(0, 1);

  return <SingleCompanyOrdersWrapper orders={orders.data} />;
}
