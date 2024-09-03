interface InputProps {
  label?: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export default function TextArea({
  name,
  placeholder,
  label,
  resize = "none",
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} w-full rounded-md border border-gray-300 p-2 ${resize === "none" ? "resize-none" : resize === "vertical" ? "resize-y" : resize === "horizontal" ? "resize-x" : "resize"}`}
      />
    </div>
  );
}
