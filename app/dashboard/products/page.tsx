import PageLayoutComp from "@/components/ui/PageLayoutComp";
import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";
import ProductsWrapper from "@/components/products/ProductsWrapper";
import { getAllProducts } from "@/lib/actions/products/getProducts";

export default async function ProductsPage() {
  const data = await getAllProducts();
  const products = data ? data.data : null;

  return (
    <PageLayoutComp title="Products" description="All the products are listed below.">
      <ProductCreationNavigatorButton />
      <ProductsWrapper products={products} />
    </PageLayoutComp>
  );
}
