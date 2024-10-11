"use client";

import { fetchSingleImage } from "@/lib/utils/fetchImages";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";
import ProductImagesCarousel from "./ProductImagesCarousel";

interface ProductDetailsProps {
  product: Product;
  userRole: string | null;
}

export default function ProductDetails({ product, userRole }: ProductDetailsProps) {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  async function fetchImagesOnLoad() {
    if (product.images.length === 0) {
      return;
    }

    const imageURLs: string[] = [];
    for (const image of product.images) {
      await fetchSingleImage({ image, setImageAsURL: (url) => imageURLs.push(url as string) });
    }
    setImages(imageURLs);
  }

  useEffect(() => {
    fetchImagesOnLoad();
  }, []);

  // Function to get the visible images

  function createOrderNavigator() {
    router.push(`/dashboard/products/${product.id}/create-order`);
  }

  function updateStockNavigator() {
    router.push(`/dashboard/products/${product.id}/update-stock`);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-8 p-4 md:flex-row md:items-start md:space-y-0 md:p-8">
      <ProductImagesCarousel images={images} />
      <div className="w-full space-y-6 px-4 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{product.name}</h1>
        <p className="text-lg text-gray-700">{product.description}</p>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
          <span className="text-green-500">${product.price.toFixed(2)}</span>
          <span
            className={`ml-4 rounded-full px-4 py-2 ${
              product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        {userRole === "User" && (
          <Button type="button" onClick={createOrderNavigator} className="bg-secondary text-white">
            Order Now
          </Button>
        )}
      </div>
    </div>
  );
}
