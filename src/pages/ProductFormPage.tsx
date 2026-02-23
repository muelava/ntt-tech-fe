import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import ProductForm from "@/components/organisms/ProductForm";
import type { ProductFormData } from "@/types/product";
import Spinner from "@/components/atoms/Spinner";
import Button from "@/components/atoms/Button";

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loading, fetchProduct, addProduct, updateProduct, clearSelected } = useProductStore();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) fetchProduct(Number(id));
    return () => clearSelected();
  }, [id, isEdit, fetchProduct, clearSelected]);

  const handleSubmit = async (data: ProductFormData) => {
    if (isEdit) {
      await updateProduct(Number(id), data);
    } else {
      await addProduct(data);
    }
    navigate("/products");
  };

  if (isEdit && loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const initialData: ProductFormData | undefined =
    isEdit && selectedProduct
      ? {
          title: selectedProduct.title,
          description: selectedProduct.description,
          category: selectedProduct.category,
          price: selectedProduct.price,
          brand: selectedProduct.brand,
          stock: selectedProduct.stock,
        }
      : undefined;

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate("/products")} className="mb-6">
        ← Kembali
      </Button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? "Edit Product" : "Tambah Product"}</h2>
      <ProductForm initialData={initialData} onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}
