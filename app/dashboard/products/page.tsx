import PageLayoutComp from "@/components/ui/PageLayoutComp";
import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";

export default function ProductsPage() {
  return (
    <PageLayoutComp title="Products" description="All the products are listed below.">
      <ProductCreationNavigatorButton />
    </PageLayoutComp>
  );
}
