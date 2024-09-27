"use client";

import { fetchSingleImage } from "@/lib/utils/fetchImages";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: Product;
  userRole: string | null;
}

export default function ProductDetails({ product, userRole }: ProductDetailsProps) {
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  async function fetchCoverImageOnLoad() {
    if (product.images.length === 0) {
      return;
    }
    await fetchSingleImage({ image: product.images[0], setImageAsURL: setImage });
  }

  useEffect(() => {
    fetchCoverImageOnLoad();
  }, []);

  function handleClick() {
    router.push(`/dashboard/products/${product.id}/create-order`);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-8 p-4 md:flex-row md:items-start md:space-y-0 md:p-8">
      <div className="flex w-full items-center justify-center md:w-1/2">
        {image && (
          <Image
            src={image}
            alt={product.name}
            width={400}
            height={400}
            className="transform rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          />
        )}
      </div>
      <div className="w-full flex-1 space-y-6 px-4 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{product.name}</h1>
        <p className="text-lg text-gray-700">{product.description}</p>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
          <span className="text-green-500">${product.price.toFixed(2)}</span>
          <span
            className={`ml-4 rounded-full px-4 py-2 ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        {userRole === "User" && (
          <Button type="button" onClick={handleClick} className="bg-secondary text-white">
            Order Now
          </Button>
        )}
      </div>
    </div>
  );
}
