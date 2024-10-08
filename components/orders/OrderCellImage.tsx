import { fetchSingleImage } from "@/lib/utils/fetchImages";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import noImage from "../../public/images/icons/no-image.svg";
import Spinner from "../ui/Spinner";

interface OrderCellImageProps {
  imageUrl: string;
}

export default function OrderCellImage({ imageUrl }: OrderCellImageProps) {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function fetchImage() {
    setLoading(true)
    if (imageUrl) {
      try {
        // Fetch the image using the provided imageUrl
        await fetchSingleImage({ image: { url: imageUrl }, setImageAsURL: setImage });
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchImage();
  }, [imageUrl]);

  return (
    <>
      {loading ? (
        <Spinner size={20} color="black" />
      ) : (
        <Image
          src={image ? image : noImage}
          alt="Order Image"
          width={100}
          height={60}
          className="h-[60px] w-[100px] rounded-lg object-cover"
        />
      )}
    </>
  );
}
