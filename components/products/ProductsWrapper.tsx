import ProductCard from "./ProductCard";

interface ProductsWrapperProps {
  products: Product[];
}

export default function ProductsWrapper({ products }: ProductsWrapperProps) {
  return (
    <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-10">
      {products && products.map((product) => <ProductCard key={product.id} {...product} />)}
    </div>
  );
}
