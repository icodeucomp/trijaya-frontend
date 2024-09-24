import { ButtonProps } from "../types";

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 text-xs md:text-base py-1.5 sm:py-2.5 md:px-8 font-medium duration-300 shadow-lg rounded-lg ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};