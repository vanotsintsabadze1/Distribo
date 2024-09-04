import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";

export default function ProductsPage() {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-1 text-sm">All the products are listed below</p>
      </div>
      <div className="flex w-full justify-end">
        <ProductCreationNavigatorButton />
      </div>
    </div>
  );
}
