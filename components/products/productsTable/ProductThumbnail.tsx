import { fetchSingleImage } from "@/lib/utils/fetchImages";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import noImage from "../../../public/images/icons/no-image.svg";
import Spinner from "@/components/ui/Spinner";

interface ProductThumbnailProps {
  images: ImageResponsePayload[];
}

export default function ProductThumbnail({ images }: ProductThumbnailProps) {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function fetchCoverImageOnLoad() {
    setLoading(true);
    if (images.length === 0) {
      return;
    }

    await fetchSingleImage({ image: images[0], setImageAsURL: setImage });
    setLoading(false);
  }

  useEffect(() => {
    fetchCoverImageOnLoad();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex h-[60px] w-[80px] items-center justify-center">
          <Spinner size={20} color="black" />
        </div>
      ) : (
        <Image
          src={image ? image : noImage}
          alt="Order Image"
          width={80}
          height={60}
          className="h-[60px] w-[80px] rounded-lg object-cover"
        />
      )}
    </>
  );
}
