import { useState, useEffect, useMemo } from "react";
import type { ProductFormData } from "@/types/product";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

const defaultData: ProductFormData = {
  title: "",
  description: "",
  category: "",
  price: 0,
  brand: "",
  stock: 0,
};

export default function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(initialData || defaultData);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const isDirty = useMemo(() => {
    const baseline = initialData || defaultData;
    return JSON.stringify(form) !== JSON.stringify(baseline);
  }, [form, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-1">
      <InputField id="title" label="Title" name="title" value={form.title} onChange={handleChange} />
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-violet-500 transition-colors" />
      </div>
      <InputField id="category" label="Category" name="category" value={form.category} onChange={handleChange} />
      <InputField id="brand" label="Brand" name="brand" value={form.brand} onChange={handleChange} />
      <InputField id="price" label="Price" name="price" type="number" value={String(form.price)} onChange={handleChange} />
      <InputField id="stock" label="Stock" name="stock" type="number" value={String(form.stock)} onChange={handleChange} />
      <div className="flex justify-end sticky bottom-0 bg-white py-2">
        <Button type="submit" isLoading={isLoading} disabled={!isDirty} className="w-full">
          Simpan
        </Button>
      </div>
    </form>
  );
}
