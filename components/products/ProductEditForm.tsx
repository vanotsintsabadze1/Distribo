"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import { useState, useEffect, useRef } from "react";
import { fetchImages } from "@/lib/utils/fetchImages";
import { editProduct } from "@/lib/actions/admin/products/editProduct";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { CreateProduct } from "@/types/schema-types";
import { createProductSchema } from "@/lib/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../ui/ErrorMessage";

export default function ProductEditForm({ ...product }: Product) {
  const [imagesAsFiles, setImagesAsFiles] = useState<File[]>([]);
  const [imagesAsURLs, setImagesAsURLs] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
  });
  const router = useRouter();

  // Set form data values on component load
  useEffect(() => {
    setValue("productName", product.name);
    setValue("description", product.description);
    setValue("price", product.price);
    setValue("stock", product.stock);
  }, []);

  async function fetchImagesOnLoad() {
    await fetchImages({ images: product.images, setFiles: setImagesAsFiles, setImagesAsURLs });

    const inputFiles = new DataTransfer();
    imagesAsFiles.forEach((image) => {
      inputFiles.items.add(image);
    });
    if (inputRef.current) {
      inputRef.current.files = inputFiles.files;
    }
  }

  useEffect(() => {
    // Fetch images and set them in the state and input ref
    fetchImagesOnLoad();
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !inputRef.current?.files) {
      return;
    }

    const files = Array.from(e.target.files);
    setImagesAsFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImagesAsURLs((prev) => [...prev, url]);
    });
  }

  async function onSubmit(updateFormData: CreateProduct) {
    if (imagesAsFiles.length === 0) {
      setImageError("Please upload at least one product image.");
      return;
    }

    setLoading(true);

    // Merge the product ID into the form data
    const formData = new FormData();
    formData.append("Name", updateFormData.productName);
    formData.append("Description", updateFormData.description);
    formData.append("Price", updateFormData.price.toString());

    // Append the images
    imagesAsFiles.forEach((file) => {
      formData.append("ImageFiles", file);
    });

    const res = await editProduct(formData, product.id);

    const validate = await apiResponseValidator({
      res,
      options: { customErrors: { 200: "Successfully edited the product", 400: "Invalid Data" } },
    });

    if (validate) {
      router.push("/dashboard/products");
    }

    setImageError(null);
    setLoading(false);
  }

  function removeImage(index: number) {
    setImagesAsFiles((prev) => prev.filter((_, i) => i !== index));
    setImagesAsURLs((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (!inputRef.current?.files) return;

    const newFiles = new DataTransfer();
    imagesAsFiles.forEach((file) => {
      newFiles.items.add(file);
    });
    inputRef.current.files = newFiles.files;
  }, [imagesAsFiles]);

  return (
    <form
      className="mt-10 flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        name="productName"
        label="Name"
        placeholder="Enter the product name.."
        register={register}
        error={errors.productName}
      />
      <TextArea
        name="description"
        label="Description"
        className="h-24"
        resize="vertical"
        placeholder="Enter the product description.."
        register={register}
        error={errors.description}
      />
      <TextInput
        name="price"
        type="number"
        label="Price"
        placeholder="Enter the price.."
        register={register}
        error={errors.price}
      />
      <label htmlFor="ImageFiles" className="mt-3 w-full">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          name="ImageFiles"
          multiple
          className="block w-full text-sm text-gray-500 text-transparent file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          onChange={handleImageUpload}
        />
      </label>
      {imageError && imagesAsFiles.length === 0 && <ErrorMessage error={imageError} />}
      <div className="mt-3 flex w-full flex-wrap items-center gap-x-5">
        {imagesAsURLs.map((url, index) => (
          <div key={url} className="relative h-20 w-20">
            <Image src={url} alt={url} fill />
            <div className="absolute right-1 top-1 rounded-lg">
              <button onClick={() => removeImage(index)} type="button" className="rounded-lg bg-black/60">
                <X size={17} className="text-white opacity-60 duration-200 ease-in-out hover:opacity-100" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Update"}
        </Button>
      </div>
    </form>
  );
}
