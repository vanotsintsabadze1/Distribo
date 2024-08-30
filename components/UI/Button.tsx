import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`${className} rounded-md p-2`}
    >
      {children}
    </button>
  );
}
