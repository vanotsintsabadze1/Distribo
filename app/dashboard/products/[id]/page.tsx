import ProductDetails from "@/components/products/ProductDetails";
import { getUserToken } from "@/lib/actions/helpers/getUserToken";
import { API_URL } from "@/lib/constants/constants";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

async function getProduct(productId: string) {
  const token = getUserToken();
  try {
    const res = await fetch(`${API_URL}/v1/Product/id?id=${productId}`);

    const data = await res.json();

    return res.ok
      ? { status: 200, message: "Successfully fetched the product", data: data }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}

export default async function ProductDetailsPage({ params: { id } }: ProductDetailsPageProps) {
  const product = await getProduct(id);

  return <ProductDetails product={product.data} />;
}
