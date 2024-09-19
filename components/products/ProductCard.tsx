"use client";

import Link from "next/link";
import { fetchSingleImage } from "@/lib/utils/fetchImages";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../ui/Spinner";
import ProductActionsBar from "./ProductActionsBar";

export default function ProductCard({ ...product }: Product) {
  const [image, setImage] = useState<string>("");

  async function fetchCoverImageOnLoad() {
    if (product.images.length === 0) {
      return;
    }

    await fetchSingleImage({ image: product.images[0], setImageAsURL: setImage });
  }

  useEffect(() => {
    fetchCoverImageOnLoad();
  }, []);

  return (
    <div className="flex w-64 flex-col items-center gap-2 rounded-lg p-4 shadow-md shadow-black/20">
      <div className="relative h-48 w-56 rounded-md shadow-md">
        {image !== "" ? (
          <>
            <Image src={image} alt={product.name} fill />
            <ProductActionsBar productId={product.id} />
          </>
        ) : (
          <Spinner size={40} color="black" />
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
        <p className="text- font-bold">{product.name}</p>
        <p className="line-clamp-2 text-xs text-gray-400">{product.description}</p>
        <Link href={`/dashboard/products/${product.id}`} className="mb-2 mt-3 text-xs font-bold text-green-600">
          View product
        </Link>
      </div>
    </div>
  );
}
