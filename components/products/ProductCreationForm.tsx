"use client";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { validateFormData } from "@/lib/utils/validation";
import { createProductSchema } from "@/lib/schema/schema";
import { CreateProduct, CreateProductError } from "@/types/schema-types";
import TextArea from "../ui/TextArea";
// import { createUser } from "@/lib/actions/admin/users/createUser";
// import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";

export default function ProductCreationForm() {
  const [productForm, setProductForm] = useState<CreateProduct>({
    productName: "",
    description: "",
    price: 0,
  });
  const [formErrors, setErrors] = useState<CreateProductError>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value, type } = e.target;

    setProductForm((prev) => ({
      ...prev,
      //   Convert input value to number if the input type is "number", because input values are always string by default.
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const { errors } = validateFormData(createProductSchema, productForm);
    console.log(errors);

    if (errors) {
      setErrors(errors);
      setLoading(false);
      return;
    } else {
      setErrors({});
    }

    // const res = await createProduct(productForm);
    // const success = await apiResponseValidator({ res, options: { outputGenericError: true } });

    // success ? setProductForm({ productName: "", description: "", price: 0 }) : null;

    setLoading(false);
  }

  return (
    <form className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full">
      <TextInput
        label="Product Name"
        value={productForm.productName}
        onChange={handleChange}
        name="productName"
        placeholder="e.g avocado"
        error={formErrors.productName}
      />
      <TextArea
        label="Description"
        value={productForm.description}
        onChange={handleChange}
        name="description"
        placeholder="Product description..."
        error={formErrors.description}
      />
      <TextInput
        label="Price"
        type="number"
        value={productForm.price}
        onChange={handleChange}
        name="price"
        placeholder="e.g 12.00"
        error={formErrors.price}
      />
      <div className="mt-4 flex w-full items-center justify-center">
        <Button onClick={handleSubmit} type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
