import Skeleton from "@/components/atoms/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Skeleton className="w-full aspect-square rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-3 w-32" />
        <div className="grid grid-cols-3 md:grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-9 rounded-lg" />
          <Skeleton className="h-9 rounded-lg" />
          <Skeleton className="h-9 rounded-lg md:col-span-2" />
        </div>
      </div>
    </div>
  );
}
