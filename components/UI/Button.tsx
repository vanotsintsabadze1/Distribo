import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  color?: string;
  textColor?: string;
  width?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type,
  className,
  color,
  textColor,
  width,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      style={{
        backgroundColor:
          color === "primary"
            ? "var(--primary"
            : color === "secondary"
              ? "var(--secondary"
              : color
                ? color
                : "var(--primary)", // One must venture to the depths of hell to read this, but basically it's just a ternary operator that checks if the color is primary, secondary, or neither, and sets the background color accordingly
        color: textColor ? textColor : "white",
        width: width ? width : "auto",
      }}
      className={`${className} rounded-md p-2`}
    >
      {children}
    </button>
  );
}
