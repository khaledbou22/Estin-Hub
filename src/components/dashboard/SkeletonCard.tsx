export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-0 rounded-[14px] border border-[#E8ECEF] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:border-[#2A2A2A] dark:bg-[#101010]">
      {/* Badge + price row */}
      <div className="mb-3 flex items-center justify-between">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-md" />
      </div>
      {/* Title */}
      <div className="skeleton mb-2 h-4 w-full rounded-md" />
      <div className="skeleton mb-3 h-4 w-3/4 rounded-md" />
      {/* Description */}
      <div className="skeleton mb-1 h-3 w-full rounded-md" />
      <div className="skeleton mb-4 h-3 w-5/6 rounded-md" />
      {/* Image placeholder for marketplace */}
      <div className="skeleton mb-4 h-28 w-full rounded-lg" />
      {/* Meta */}
      <div className="skeleton mb-4 h-3 w-1/3 rounded-md" />
      {/* Divider */}
      <div className="my-3 h-px bg-[#F1F5F9] dark:bg-[#2A2A2A]" />
      {/* Author row */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="skeleton h-7 w-7 rounded-full" />
          <div className="skeleton h-3 w-24 rounded-md" />
        </div>
        <div className="skeleton h-3 w-16 rounded-md" />
      </div>
      {/* Buttons */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="skeleton h-7 rounded-[7px]" />
        <div className="skeleton h-7 rounded-[7px]" />
      </div>
      <style>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #F1F5F9 25%,
            #E2E8F0 50%,
            #F1F5F9 75%
          );
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s infinite;
        }
        @keyframes skeleton-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
