import { useEffect, useCallback, useState } from "react";
import { motion } from "motion/react";
import { useProductStore } from "@/stores/useProductStore";
import SearchBar from "@/components/molecules/SearchBar";
import ProductCard from "@/components/molecules/ProductCard";
import ProductCardSkeleton from "@/components/molecules/ProductCardSkeleton";
import ProductForm from "@/components/organisms/ProductForm";
import Modal from "@/components/atoms/Modal";
import ConfirmDialog from "@/components/atoms/ConfirmDialog";
import Button from "@/components/atoms/Button";
import type { Product, ProductFormData } from "@/types/product";

export default function ProductListPage() {
  const { products, total, skip, limit, loading, fetchProducts, searchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback(
    (q: string) => {
      if (q.trim()) {
        searchProducts(q);
      } else {
        fetchProducts();
      }
    },
    [searchProducts, fetchProducts],
  );

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (data: ProductFormData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  const initialData: ProductFormData | undefined = editingProduct
    ? {
        title: editingProduct.title,
        description: editingProduct.description,
        category: editingProduct.category,
        price: editingProduct.price,
        brand: editingProduct.brand,
        stock: editingProduct.stock,
      }
    : undefined;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const goToPage = (page: number) => {
    fetchProducts(limit, (page - 1) * limit);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <Button onClick={handleOpenAdd}>+ Tambah</Button>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Cari produk..." />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <ProductCard product={product} onEdit={handleOpenEdit} onDelete={handleDelete} />
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <>
              <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#eaeaea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M7 8.75c1-1 2.63-1 3.64 0M13.36 8.75c1-1 2.63-1 3.64 0M8.4 17.7h7.2c.5 0 .9-.4.9-.9 0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5c0 .5.4.9.9.9Z" stroke="#eaeaea" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="text-center text-gray-400 py-12">Tidak ada produk ditemukan.</p>
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed">
                ←
              </button>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${page === currentPage ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed">
                →
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Edit Product" : "Tambah Product"}
      >
        <ProductForm key={editingProduct?.id ?? "add"} initialData={initialData} onSubmit={handleSubmit} isLoading={loading} />
      </Modal>

      <ConfirmDialog isOpen={deleteId !== null} title="Hapus Produk" message="Apakah kamu yakin ingin menghapus produk ini?" confirmLabel="Hapus" cancelLabel="Batal" variant="danger" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
