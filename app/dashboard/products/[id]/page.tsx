import ProductDetails from "@/components/products/ProductDetails";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { API_URL } from "@/lib/constants/constants";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

async function getProduct(productId: string) {
  try {
    const res = await fetch(`${API_URL}/v1/Product/${productId}`, { cache: "no-cache" });

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
  const userRole = await getUserRole();

  return <ProductDetails product={product.data} userRole={userRole} />;
}
