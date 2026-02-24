import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: boolean;
}

export default function PasswordInput({ error, className = "", ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  const base = "w-full px-3 py-2 pr-10 border rounded-lg outline-none transition-colors duration-200";
  const state = error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500";

  return (
    <div className="relative">
      <input type={show ? "text" : "password"} className={`${base} ${state} ${className}`} {...props} />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
