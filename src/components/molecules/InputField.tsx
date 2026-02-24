import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

interface InputFieldProps {
  label: string;
  error?: string;
  id: string;
  type?: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function InputField({ label, error, id, name, onChange, placeholder, autoFocus, ...inputProps }: InputFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} onChange={onChange} placeholder={placeholder} {...inputProps} autoFocus={autoFocus} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
