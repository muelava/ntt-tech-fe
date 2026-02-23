import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import Button from "@/components/atoms/Button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <img src={product.thumbnail} alt={product.title} className="w-full object-cover aspect-square" />
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium uppercase mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.title}</h3>
        <p className="text-lg font-bold text-gray-900 mb-1">${product.price}</p>
        <p className="text-sm text-gray-500 mb-3">
          ⭐ {product.rating} · Stock: {product.stock}
        </p>

        <div className="flex gap-2">
          <Button variant="secondary" icon={Eye} className="flex-1 text-sm" onClick={() => navigate(`/products/${product.id}`)}>
            Detail
          </Button>
          <Button variant="secondary" icon={Pencil} className="flex-1 text-sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="danger" icon={Trash2} className="text-sm" onClick={() => onDelete(product.id)}>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
