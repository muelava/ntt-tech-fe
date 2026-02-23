import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  icon?: LucideIcon;
  isLoading?: boolean;
}

export default function Button({ children, variant = "primary", icon: Icon, isLoading, className = "", disabled, ...props }: ButtonProps) {
  const hasIcon = !!Icon;
  const base = "rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5";
  const sizing = hasIcon ? "p-2 md:px-4 md:py-2" : "px-4 py-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${base} ${sizing} ${variants[variant]} ${className}`} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {children && <span className={hasIcon ? "hidden md:inline" : ""}>{children}</span>}
        </>
      )}
    </button>
  );
}
