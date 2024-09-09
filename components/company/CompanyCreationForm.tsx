"use client";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import CompanyDocument from "./CompanyDocument";
import { createCompanyFormSchema } from "@/lib/schema/schema";
import { validateFormData } from "@/lib/utils/validation";
import { CreateCompanyData, CreateCompanyErrors } from "@/types/schema-types";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useRef, useState } from "react";
import { apiResponseValidator } from "@/lib/utils/apiResponseValidator";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";

export default function CompanyCreationForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [companyFormData, setCompanyFormData] = useState<CreateCompanyData>({
    // companyId: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    // companyDescription: "",
  });
  const [errors, setErrors] = useState<CreateCompanyErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { errors, data } = validateFormData(createCompanyFormSchema, companyFormData);

    if (errors) {
      setErrors(errors);
      setLoading(false);
      return;
    } else {
      setErrors({});
    }

    const res = await createCompany({
      name: companyFormData.companyName,
      address: companyFormData.companyAddress,
      phone: companyFormData.companyPhone,
      email: companyFormData.companyEmail,
    });

    const success = await apiResponseValidator({ res });

    if (success) {
      router.push("/dashboard/company");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
    >
      {/* <TextInput
        name="companyId"
        label="Company ID Number"
        value={companyFormData.companyId}
        onChange={handleChange}
        placeholder="e.g 101202303"
        className="pl-4 pr-2"
        error={errors.companyId}
      /> */}
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
      <TextInput
        name="companyPhone"
        label="Phone"
        value={companyFormData.companyPhone}
        onChange={handleChange}
        placeholder="e.g +032 324 123"
        className="pl-4 pr-2"
        error={errors.companyPhone}
      />
      <TextInput
        name="companyEmail"
        label="Email"
        value={companyFormData.companyEmail}
        onChange={handleChange}
        placeholder="e.g companymail@gmail.com"
        className="pl-4 pr-2"
        error={errors.companyEmail}
      />
      {/* <TextArea
        name="companyDescription"
        label="Description"
        value={companyFormData.companyDescription}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="min-h-[6rem] overflow-auto pl-4 pr-2"
        error={errors.companyDescription}
      /> */}
      <CompanyDocument inputRef={inputRef} documents={documents} setDocuments={setDocuments} />
      <div className="mt-1 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner size={20} color="white" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
