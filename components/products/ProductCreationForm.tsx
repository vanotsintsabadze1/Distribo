"use client";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { useRef, useState } from "react";
import { validateFormData } from "@/lib/utils/validation";
import { createProductSchema } from "@/lib/schema/schema";
import { CreateProduct, CreateProductError } from "@/types/schema-types";
import TextArea from "../ui/TextArea";
import ImageUpload from "./ImageUpload";
import { createProduct } from "@/lib/actions/admin/products/createProduct";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";

export default function ProductCreationForm() {
  const [productForm, setProductForm] = useState<CreateProduct>({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [formErrors, setErrors] = useState<CreateProductError>({});
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value, type } = e.target;

    const fieldNameMap = {
      Name: "productName",
      Description: "description",
      Price: "price",
      Stock: "stock",
    };

    const fieldKey = fieldNameMap[name as keyof typeof fieldNameMap];
    if (fieldKey) {
      setProductForm((prev) => ({
        ...prev,
        // Convert input value to number if the input type is "number"
        [fieldKey]: type === "number" ? Number(value) : value,
      }));
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const { errors } = validateFormData(createProductSchema, productForm);

    if (errors) {
      setErrors(errors);
      setLoading(false);
      return;
    } else {
      setErrors({});
    }

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const res = await createProduct(formData);
    const success = await apiResponseValidator({ res, options: { outputGenericError: true } });

    if (success) {
      setProductForm({ productName: "", description: "", price: 0, stock: 0 });
      setSelectedImage([]);
    } else {
      return null;
    }

    setLoading(false);
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      ref={formRef}
    >
      <TextInput
        label="Product Name"
        value={productForm.productName}
        onChange={handleChange}
        name="Name"
        placeholder="e.g avocado"
        error={formErrors.productName}
      />
      <TextArea
        label="Description"
        value={productForm.description}
        onChange={handleChange}
        name="Description"
        placeholder="Product description..."
        error={formErrors.description}
      />
      <TextInput
        label="Price"
        type="number"
        value={productForm.price}
        onChange={handleChange}
        name="Price"
        placeholder="e.g 12.00"
        error={formErrors.price}
      />
      <TextInput
        label="Stock"
        type="number"
        value={productForm.stock}
        onChange={handleChange}
        name="Stock"
        placeholder="e.g 12.00"
        error={formErrors.stock}
      />
      <ImageUpload inputRef={inputRef} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <div className="mt-4 flex w-full items-center justify-center">
        <Button onClick={handleSubmit} type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
