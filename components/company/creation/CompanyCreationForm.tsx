"use client";
import Button from "@/components/UI/Button";
import TextArea from "@/components/UI/TextArea";
import TextInput from "@/components/UI/TextInput";
import { createCompanyFormSchema } from "@/lib/schema/schema";
import { validateFormData } from "@/lib/utils/validation";
import { CreateCompanyData, CreateCompanyErrors } from "@/types/schema-types";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

export default function CompanyCreationForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [companyFormData, setcompanyFormData] = useState<CreateCompanyData>({
    companyId: "",
    companyName: "",
    companyPassword: "",
    companyDescription: "",
  });
  const [errors, setErrors] = useState<CreateCompanyErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setcompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, data } = validateFormData(
      createCompanyFormSchema,
      companyFormData,
    );

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      console.log("Form data is valid:", data);
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setDocuments((prev) => [...prev, ...Array.from(files)]);
    }
  }

  function onDocumentRemove(index: number) {
    setDocuments((prev) => prev.filter((_, idx) => idx !== index));

    if (inputRef.current?.files) {
      const newFiles = new DataTransfer();
      documents.forEach((file) => newFiles.items.add(file));
      inputRef.current.files = newFiles.files;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
    >
      <TextInput
        name="companyId"
        label="ID"
        value={companyFormData.companyId}
        onChange={handleChange}
        placeholder="e.g 12345"
        className="pl-4 pr-2"
      />
      {errors.companyId && (
        <p className="mt-2 text-red-600">{errors.companyId}</p>
      )}
      <TextInput
        name="companyName"
        label="Name"
        value={companyFormData.companyName}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="pl-4 pr-2"
      />
      {errors.companyName && (
        <p className="mt-2 text-red-600">{errors.companyName}</p>
      )}
      <TextInput
        name="companyPassword"
        label="Password"
        value={companyFormData.companyPassword}
        onChange={handleChange}
        placeholder="e.g Password123$!@#"
        className="pl-4 pr-2"
        type="password"
      />
      {errors.companyPassword && (
        <p className="mt-2 text-red-600">{errors.companyPassword}</p>
      )}
      <TextArea
        name="companyDescription"
        label="Description"
        value={companyFormData.companyDescription}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="min-h-[6rem] overflow-auto pl-4 pr-2"
      />
      {errors.companyDescription && (
        <p className="mt-2 text-red-600">{errors.companyDescription}</p>
      )}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold">Additional Documents (Optional):</span>
        <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3">
          {documents.map((document, idx) => (
            <div
              key={idx}
              className="relative flex h-32 w-32 flex-col items-center justify-center rounded-md bg-gray-100 px-2"
            >
              <span className="text- text-lg font-bold">
                {(document.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <span className="w-full truncate text-xs font-medium text-blue-800">
                {document.name}
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[.6rem] font-medium uppercase tracking-wider text-gray-400">
                Click to preview
              </span>
              <button
                onClick={() => onDocumentRemove(idx)}
                className="absolute right-2 top-2 rounded-md bg-black/40 p-1"
              >
                <X size={15} color="white" />
              </button>
            </div>
          ))}
          <label
            htmlFor="companyDocuments"
            className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md"
          >
            <Plus size={25} />
          </label>
          <input
            ref={inputRef}
            type="file"
            name="companyDocuments"
            id="companyDocuments"
            className="hidden"
            onChange={handleFileChange}
            accept="application/pdf"
            multiple
          />
        </div>
      </div>
      <div className="mt-1 flex w-full items-center justify-center">
        <Button
          type="submit"
          className="w-32 bg-secondary font-semibold text-white"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
