interface InputProps {
  label?: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
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
      {value && onChange ? (
        // Since we don't know if we want the input to be controlled or not, we're checking if the value and onChange props are passed, if they are, we're making the input controlled, otherwise, it's uncontrolled.
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} w-full rounded-md border border-gray-300 p-2 ${resize === "none" ? "resize-none" : resize === "vertical" ? "resize-y" : resize === "horizontal" ? "resize-x" : "resize"}`}
        />
      ) : (
        <textarea
          name={name}
          placeholder={placeholder}
          className={`${className} w-full rounded-md border border-gray-300 p-2 ${resize === "none" ? "resize-none" : resize === "vertical" ? "resize-y" : resize === "horizontal" ? "resize-x" : "resize"}`}
        />
      )}
    </div>
  );
}
