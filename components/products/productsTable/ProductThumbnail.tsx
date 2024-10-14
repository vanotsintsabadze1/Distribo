import Image from "next/image";
import noImage from "../../../public/images/icons/no-image.svg";

interface ProductThumbnailProps {
  images: ImageResponsePayload[];
}

export default function ProductThumbnail({ images }: ProductThumbnailProps) {
  return (
    <Image
      src={images[0].url}
      alt="Order Image"
      width={80}
      height={60}
      className="h-[60px] w-[80px] rounded-lg object-cover"
    />
  );
}
