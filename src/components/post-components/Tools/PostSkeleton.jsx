export const PostSkeleton = () => {
  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-6 mx-auto mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full animate-shimmer" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-40 rounded-lg animate-shimmer" />
          <div className="h-4 w-24 rounded animate-shimmer" />
        </div>
      </div>

      <div className="w-full h-64 rounded-2xl mb-6 animate-shimmer" />

      <div className="flex justify-around mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded animate-shimmer" />
          <div className="h-4 w-16 rounded animate-shimmer" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded animate-shimmer" />
          <div className="h-4 w-16 rounded animate-shimmer" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded animate-shimmer" />
          <div className="h-4 w-16 rounded animate-shimmer" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-5 w-full rounded-lg animate-shimmer" />
        <div className="h-5 w-11/12 rounded-lg animate-shimmer" />
        <div className="h-5 w-9/12 rounded-lg animate-shimmer" />
        <div className="h-5 w-3/4 rounded-lg animate-shimmer" />
      </div>
    </div>
  );
};