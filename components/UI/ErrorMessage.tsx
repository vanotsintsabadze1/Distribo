import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error: FieldError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    error && (
      <div className="flex w-full">
        <p className="text-xs font-semibold text-red-600">{error.message}</p>
      </div>
    )
  );
}
