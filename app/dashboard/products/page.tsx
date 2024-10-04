import PageLayoutComp from "@/components/ui/PageLayoutComp";
import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";
import ProductsWrapper from "@/components/products/ProductsWrapper";
import { getAllProducts } from "@/lib/actions/products/getProducts";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";

export default async function ProductsPage() {
  const data = await getAllProducts();
  const products = data ? data.data : null;
  const role = await getUserRole();
  const isAdmin = role === "Admin" || role === "Employee";

  return (
    <PageLayoutComp title="Products" description="All the products are listed below.">
      {isAdmin && <ProductCreationNavigatorButton />}
      <ProductsWrapper products={products} />
    </PageLayoutComp>
  );
}
