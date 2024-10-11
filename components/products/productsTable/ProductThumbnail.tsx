import Image from "next/image";
import noImage from "../../../public/images/icons/no-image.svg";

interface ProductThumbnailProps {
  images: ImageResponsePayload[];
}

export default function ProductThumbnail({ images }: ProductThumbnailProps) {
  const imageSrc = images.length > 0 && images[0].base64 ? images[0].base64 : noImage;
  return (
    <Image
      src={imageSrc}
      alt="Order Image"
      width={80}
      height={60}
      className="h-[60px] w-[80px] rounded-lg object-cover"
    />
  );
}
