import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "@/lib/actions/helpers/getUserToken";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";
import ProductsWrapper from "@/components/products/ProductsWrapper";

async function getAllProducts() {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    const data = await res.json();

    // prettier-ignore
    return res.ok ? { status: 200, message: "Successfully fetched the products", data } : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}

export default async function ProductsPage() {
  const data = await getAllProducts();
  const products = data ? data.data : null;

  // console.log(products);
  return (
    <PageLayoutComp title="Products" description="All the products are listed below.">
      <ProductCreationNavigatorButton />
      <ProductsWrapper products={products} />
    </PageLayoutComp>
  );
}
