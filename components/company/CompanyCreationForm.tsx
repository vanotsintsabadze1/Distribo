"use client";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { createCompanyFormSchema } from "@/lib/schema/schema";
import { validateFormData } from "@/lib/utils/validation";
import { CreateCompanyData, CreateCompanyErrors } from "@/types/schema-types";
import { useRef, useState } from "react";
import CompanyDocument from "./CompanyDocument";

export default function CompanyCreationForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [companyFormData, setCompanyFormData] = useState<CreateCompanyData>({
    companyId: "",
    companyName: "",
    companyAddress: "",
    companyDescription: "",
  });
  const [errors, setErrors] = useState<CreateCompanyErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, data } = validateFormData(createCompanyFormSchema, companyFormData);

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      console.log("Form data is valid:", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
    >
      <TextInput
        name="companyId"
        label="Company ID Number"
        value={companyFormData.companyId}
        onChange={handleChange}
        placeholder="e.g 101202303"
        className="pl-4 pr-2"
        error={errors.companyId}
      />
      <TextInput
        name="companyName"
        label="Company Name"
        value={companyFormData.companyName}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="pl-4 pr-2"
        error={errors.companyName}
      />
      <TextInput
        name="companyAddress"
        label="Address"
        value={companyFormData.companyAddress}
        onChange={handleChange}
        placeholder="e.g street # 1"
        className="pl-4 pr-2"
        error={errors.companyAddress}
      />
      <TextArea
        name="companyDescription"
        label="Description"
        value={companyFormData.companyDescription}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="min-h-[6rem] overflow-auto pl-4 pr-2"
        error={errors.companyDescription}
      />
      <CompanyDocument inputRef={inputRef} documents={documents} setDocuments={setDocuments} />
      <div className="mt-1 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          Create
        </Button>
      </div>
    </form>
  );
}
