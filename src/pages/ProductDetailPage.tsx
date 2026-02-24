import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import Button from "@/components/atoms/Button";
import ProductDetailSkeleton from "@/components/molecules/ProductDetailSkeleton";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct: product, loading, fetchProduct, clearSelected } = useProductStore();

  useEffect(() => {
    if (id) fetchProduct(Number(id));
    return () => clearSelected();
  }, [id, fetchProduct, clearSelected]);

  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate("/products")} className="mb-6">
        ← Kembali
      </Button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="w-full h-80 object-cover" />
          </div>
          <div className="p-6 md:w-1/2">
            <p className="text-sm text-violet-600 font-medium uppercase mb-2">{product.category}</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
            <p className="text-gray-500 mb-4">{product.description}</p>

            <div className="space-y-2 mb-4">
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
              <p className="text-sm text-gray-500">Brand: {product.brand || "-"}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500">Rating: ⭐ {product.rating}</p>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => navigate(`/products/${product.id}/edit`)}>Edit</Button>
            </div>
          </div>
        </div>

        {product.reviews?.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Reviews</h3>
            <div className="space-y-3">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{review.reviewerName}</span>
                    <span className="text-sm text-gray-400">⭐ {review.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
