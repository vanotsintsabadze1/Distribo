import PageAuthenticator from "@/components/auth/PageAuthenticator";
import OrdersWrapper from "@/components/orders/OrdersWrapper";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getAllCompaniesOrders } from "@/lib/actions/orders/getAllCompaniesOrders";
import { DEFAULT_ORDER_COUNT, UserRole } from "@/lib/constants/constants";
import { redirect } from "next/navigation";

interface OrdersPageProps {
  searchParams: {
    page: string;
    type: string;
  };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const role = await getUserRole();

  if (role === null || role === undefined) {
    return redirect("/auth/login");
  }

  if (role !== UserRole.Admin && role !== UserRole.Employee) {
    return redirect("/dashboard/profile/my-company?orders=true");
  }

  const page = isNaN(parseInt(searchParams.page)) ? 1 : parseInt(searchParams.page);
  const type = isNaN(parseInt(searchParams.type)) ? 0 : parseInt(searchParams.type);
  const orders = await getAllCompaniesOrders(type, page, DEFAULT_ORDER_COUNT);

  return (
    <PageAuthenticator shouldAllow="admin" shouldNotAllowUnauthenticated redirectTo="/dashboard">
      <PageLayoutComp title="Orders" description="All the orders are listed below.">
        <OrdersWrapper orders={orders?.data} role={role} page={page} />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
