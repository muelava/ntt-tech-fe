import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import Button from "@/components/atoms/Button";
import Skeleton from "@/components/atoms/Skeleton";

function DetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-28 mb-6" />
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Skeleton className="w-full h-80 rounded-none" />
          </div>
          <div className="p-6 md:w-1/2 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-9 w-20 mt-2" />
          </div>
        </div>
        <div className="border-t border-gray-200 p-6 space-y-3">
          <Skeleton className="h-5 w-20" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct: product, loading, fetchProduct, clearSelected } = useProductStore();

  useEffect(() => {
    if (id) fetchProduct(Number(id));
    return () => clearSelected();
  }, [id, fetchProduct, clearSelected]);

  if (loading || !product) {
    return <DetailSkeleton />;
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
