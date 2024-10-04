import ProductCard from "./ProductCard";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";

interface ProductsWrapperProps {
  products: Product[] | null;
}

export default async function ProductsWrapper({ products }: ProductsWrapperProps) {
  const role = await getUserRole();
  const hasEditPerms = role === "Admin" || role === "Employee";

  return (
    <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-10">
      {products && products.map((product) => <ProductCard key={product.id} hasEditPerms={hasEditPerms} {...product} />)}
    </div>
  );
}
