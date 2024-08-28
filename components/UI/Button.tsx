import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  color?: string;
  textColor?: string;
  width?: string;
}

export default function Button({
  children,
  type,
  className,
  color,
  textColor,
  width,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} rounded-md p-2 px-4 bg-${color} text-${textColor} w-${width}`}
    >
      {children}
    </button>
  );
}
