import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

interface InputFieldProps {
  label: string;
  error?: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({ label, error, id, ...inputProps }: InputFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} error={!!error} {...inputProps} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
