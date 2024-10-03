"use client";

import { fetchSingleImage } from "@/lib/utils/fetchImages";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  userRole: string | null;
}

export default function ProductDetails({ product, userRole }: ProductDetailsProps) {
  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
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
  const getVisibleImages = () => {
    const visibleImages: string[] = [];
    const imageCount = images.length;

    if (imageCount === 0) return visibleImages;

    // Only show available images
    for (let i = 0; i < Math.min(3, imageCount); i++) {
      visibleImages.push(images[(imageIndex + i) % imageCount]);
    }

    return visibleImages;
  };

  function handleClick() {
    router.push(`/dashboard/products/${product.id}/create-order`);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-8 p-4 md:flex-row md:items-start md:space-y-0 md:p-8">
      <div className="flex items-center">
        {images.length > 0 && (
          <Carousel.Root align="center" loop={true} slidesPerView={3} orientation="horizontal" spacing="0px">
            <div className="relative">
              <Image
                src={images[imageIndex]}
                alt={`Slide`}
                width={420}
                height={300}
                className="h-[300px] w-[420px] rounded-t-lg"
              />
              <Carousel.Control className="absolute top-1/2 flex w-full justify-between">
                <Carousel.PrevTrigger>
                  <ChevronLeft
                    size={35}
                    onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  />
                </Carousel.PrevTrigger>
                <Carousel.NextTrigger>
                  <ChevronRight size={35} onClick={() => setImageIndex((prev) => (prev + 1) % images.length)} />
                </Carousel.NextTrigger>
              </Carousel.Control>
            </div>
            <Carousel.Viewport className="w-[420px]">
              <Carousel.ItemGroup>
                {getVisibleImages().map((image, index) => (
                  <Carousel.Item key={index} index={index}>
                    <div className="relative">
                      <Image
                        src={image}
                        alt={`Slide ${index}`}
                        width={140}
                        height={100}
                        className={`h-[100px] w-[140px] cursor-pointer transition-all ${
                          imageIndex === (index + imageIndex) % images.length
                            ? "border-4 border-secondary shadow-lg"
                            : "border border-transparent opacity-50"
                        }`}
                        onClick={() => setImageIndex((imageIndex + index) % images.length)}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
            </Carousel.Viewport>
          </Carousel.Root>
        )}
      </div>
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
          <Button type="button" onClick={handleClick} className="bg-secondary text-white">
            Order Now
          </Button>
        )}
      </div>
    </div>
  );
}
