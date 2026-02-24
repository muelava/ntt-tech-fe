import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  const base = "w-full px-3 py-2 border rounded-lg outline-none transition-colors duration-200";
  const state = error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-violet-500";

  return <input className={`${base} ${state} ${className}`} {...props} />;
}
