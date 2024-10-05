import Image from "next/image";
import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

interface ProductImagesCarouselProps {
  images: string[];
}

export default function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);

  //   const getVisibleImages = () => {
  //     const visibleImages: string[] = [];
  //     const imageCount = images.length;

  //     if (imageCount === 0) return visibleImages;

  //     // Only show available images
  //     for (let i = 0; i < Math.min(3, imageCount); i++) {
  //       visibleImages.push(images[(imageIndex + i) % imageCount]);
  //     }

  //     return visibleImages;
  //   };

  return (
    <div className="m-auto flex items-center p-4 md:p-0">
      {images.length > 0 ? (
        <Carousel.Root align="center" loop={true} slidesPerView={3} orientation="horizontal" spacing="12px">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Image
                src={images[imageIndex]}
                alt={`Slide`}
                width={420}
                height={300}
                className="h-[300px] w-[420px] rounded-lg shadow-lg"
              />
              <Carousel.Control className="absolute top-1/2 flex w-full justify-between px-2">
                <Carousel.PrevTrigger>
                  <span
                    className="flex items-center justify-center rounded-full bg-secondary p-1"
                    onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft size={20} color="white" />
                  </span>
                </Carousel.PrevTrigger>
                <Carousel.NextTrigger>
                  <span
                    className="flex items-center justify-center rounded-full bg-secondary p-1"
                    onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
                  >
                    <ChevronRight size={20} color="white" />
                  </span>
                </Carousel.NextTrigger>
              </Carousel.Control>
            </div>
            <Carousel.Viewport className="w-[270px]">
              <Carousel.ItemGroup className="flex flex-wrap items-center justify-center">
                {images.map((image, index) => (
                  <Carousel.Item key={index} index={index}>
                    <div className="relative">
                      <Image
                        src={image}
                        alt={`Slide ${index}`}
                        width={90}
                        height={60}
                        className={`h-[60px] w-[90px] cursor-pointer rounded-md shadow-md transition-all ${
                          imageIndex === index ? "border-2 border-black shadow-lg" : "border-2 border-gray-300 opacity-50"
                        }`}
                        onClick={() => setImageIndex(index)}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
            </Carousel.Viewport>
          </div>
        </Carousel.Root>
      ) : (
        <Spinner size={40} color="black" />
      )}
    </div>
  );
}
