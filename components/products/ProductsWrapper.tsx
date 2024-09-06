import ProductCard from "./ProductCard";

interface ProductsWrapperProps {
  products: Product[];
}

export default function ProductsWrapper({ products }: ProductsWrapperProps) {
  console.log(products.map((product) => product.id));

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-10">
      {products && products.map((product) => <ProductCard key={product.id} {...product} />)}
    </div>
  );
}
