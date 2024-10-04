import Image from "next/image";
import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductImagesCarouselProps {
  images: string[];
}

export default function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);

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

  return (
    <div className="flex items-center p-4 md:p-0">
      {images.length > 0 && (
        <Carousel.Root align="center" loop={true} slidesPerView={3} orientation="horizontal" spacing="10px">
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
              <Carousel.ItemGroup>
                {getVisibleImages().map((image, index) => (
                  <Carousel.Item key={index} index={index}>
                    <div className="relative">
                      <Image
                        src={image}
                        alt={`Slide ${index}`}
                        width={90}
                        height={60}
                        className={`h-[60px] w-[90px] cursor-pointer rounded-md shadow-md transition-all ${
                          imageIndex === (index + imageIndex) % images.length ? "shadow-lg" : "opacity-50"
                        }`}
                        onClick={() => setImageIndex((imageIndex + index) % images.length)}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
            </Carousel.Viewport>
          </div>
        </Carousel.Root>
      )}
    </div>
  );
}
