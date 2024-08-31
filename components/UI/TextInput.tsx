interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: "text" | "password" | "email";
}

export default function TextInput({
  name,
  placeholder,
  label,
  value,
  onChange,
  type = "text",
  className,
}: InputProps) {
  return (
    // <div className="flex flex-col gap-1.5">
    //   <label htmlFor={name} className="text-sm font-semibold">
    //     {label}
    //   </label>
    //   {value && onChange ? (
    //     // Since we don't know if we want the input to be controlled or not, we're checking if the value and onChange props are passed, if they are, we're making the input controlled, otherwise, it's uncontrolled.
    //     <input
    //       type={type}
    //       name={name}
    //       value={value}
    //       onChange={onChange}
    //       placeholder={placeholder}
    //       className={`${className} w-full rounded-md border border-gray-300 p-2`}
    //     />
    //   ) : (
    //     <input
    //       type={type}
    //       name={name}
    //       placeholder={placeholder}
    //       className={`${className} w-full rounded-md border border-gray-300 p-2`}
    //     />
    //   )}
    // </div>
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} w-full rounded-md border border-gray-300 p-2`}
      />
    </div>
  );
}
