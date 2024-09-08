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
import { CreateProduct, CreateProductError } from "@/types/schema-types";
import { validateFormData } from "@/lib/utils/validation";
import { createProductSchema } from "@/lib/schema/schema";

export default function ProductEditForm({ ...product }: Product) {
  const [productData, setProductData] = useState({
    Name: product.name,
    Description: product.description,
    Price: product.price,
    Stock: product.stock,
    ImageFiles: product.images,
  });
  const [imagesAsFiles, setImagesAsFiles] = useState<File[]>([]);
  const [imagesAsURLs, setImagesAsURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<CreateProductError>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { errors } = validateFormData(createProductSchema, {
      productName: productData.Name,
      description: productData.Description,
      price: productData.Price,
      stock: productData.Stock,
    } as CreateProduct);

    if (errors) {
      setFormErrors(errors);
      setLoading(false);
      return;
    } else {
      setFormErrors({});
    }

    const formData = new FormData(e.currentTarget);
    formData.append("Id", product.id);

    const res = await editProduct(formData);
    const validate = await apiResponseValidator({ res });

    if (validate) {
      router.push("/dashboard/products");
    }

    setLoading(false);
  }

  function removeImage(index: number) {
    setImagesAsFiles((prev) => prev.filter((_, i) => i !== index));
    setImagesAsURLs((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    fetchImagesOnLoad();
  }, []);

  useEffect(() => {
    if (!inputRef.current?.files) {
      return;
    }

    const newFiles = new DataTransfer();
    imagesAsFiles.forEach((file) => {
      newFiles.items.add(file);
    });
    inputRef.current.files = newFiles.files;
  }, [imagesAsFiles]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
    >
      <TextInput
        name="Name"
        label="Name"
        value={productData.Name}
        onChange={(e) => setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        placeholder="Enter the product name.."
        error={formErrors.productName}
      />
      <TextArea
        name="Description"
        label="Description"
        className="h-24"
        resize="vertical"
        value={productData.Description}
        onChange={(e) => setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        placeholder="Enter the product name.."
        error={formErrors.description}
      />
      <TextInput
        name="Price"
        type="number"
        label="Price"
        value={productData.Price}
        onChange={(e) => setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        placeholder="Enter the product name.."
        error={formErrors.price}
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
      <div className="mt-3 flex w-full flex-wrap items-center gap-x-5">
        {imagesAsURLs.map((url, index) => (
          <div key={url} className="relative h-20 w-20">
            <Image src={url} alt={url} fill />
            <div className="absolute right-1 top-1 rounded-lg">
              <button onClick={() => removeImage(index)} className="rounded-lg bg-black/60">
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
