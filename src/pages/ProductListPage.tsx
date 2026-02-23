import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import SearchBar from "@/components/molecules/SearchBar";
import ProductCard from "@/components/molecules/ProductCard";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";

export default function ProductListPage() {
  const navigate = useNavigate();
  const { products, total, skip, limit, loading, fetchProducts, searchProducts, deleteProduct } = useProductStore();

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

  const handleDelete = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      await deleteProduct(id);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const goToPage = (page: number) => {
    fetchProducts(limit, (page - 1) * limit);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <Button onClick={() => navigate("/products/add")}>+ Tambah</Button>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Cari produk..." />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </div>

          {products.length === 0 && <p className="text-center text-gray-400 py-12">Tidak ada produk ditemukan.</p>}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
