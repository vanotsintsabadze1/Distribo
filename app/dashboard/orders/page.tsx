import PageAuthenticator from "@/components/auth/PageAuthenticator";
import SingleCompanyOrdersWrapper from "@/components/orders/SingleCompanyOrdersWrapper";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getAllCompaniesOrders } from "@/lib/actions/orders/getAllCompaniesOrders";

export default async function OrdersPage() {
  const orders = await getAllCompaniesOrders(0, 1, 10);
  const role = await getUserRole();

  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard/profile/my-company?orders=true">
      <PageLayoutComp title="Orders" description="All the orders are listed below.">
        <SingleCompanyOrdersWrapper orders={orders.data} role={role} />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
