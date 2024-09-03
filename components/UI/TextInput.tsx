import ErrorMessage from "./ErrorMessage";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: "text" | "password" | "email";
  error?: string[];
}

export default function TextInput({
  name,
  placeholder,
  label,
  value,
  onChange,
  type = "text",
  className,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <div className="flex w-full flex-col gap-2">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} w-full rounded-md border border-gray-300 p-2`}
        />
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}