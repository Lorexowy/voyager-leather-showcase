interface ProductCardSkeletonProps {
  count?: number;
  className?: string;
}

function SingleSkeleton() {
  return (
    <div className="bg-white border border-gray-100 h-full flex flex-col">
      <div className="aspect-square skeleton-shimmer" />
      <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4">
        <div className="h-3 w-16 skeleton-shimmer rounded-sm" />
        <div className="h-5 w-3/4 skeleton-shimmer rounded-sm" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full skeleton-shimmer rounded-sm" />
          <div className="h-3 w-2/3 skeleton-shimmer rounded-sm" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          <div className="flex-1 h-10 skeleton-shimmer rounded-sm" />
          <div className="flex-1 h-10 skeleton-shimmer rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default function ProductCardSkeleton({ count = 6, className = '' }: ProductCardSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <SingleSkeleton key={index} />
      ))}
    </div>
  );
}
