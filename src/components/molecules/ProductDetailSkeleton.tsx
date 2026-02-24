import Skeleton from "../atoms/Skeleton";

const ProductDetailSkeleton = () => {
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
};

export default ProductDetailSkeleton;
