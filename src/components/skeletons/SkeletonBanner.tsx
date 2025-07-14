export default function SkeletonBanner() {
  return (
    <div className="banner-responsive relative animate-pulse">
      <div className="banner-responsive banner-gradient fixed z-0 w-full bg-gray-900" />
      <div className="banner-info responsive-spacing w-full">
        <div className="h-12 w-1/3 rounded bg-gray-600" />
        <div className="h-4 w-1/2 rounded bg-gray-700" />
        <div className="h-4 w-full rounded bg-gray-700 md:w-1/2" />
        <div className="h-4 w-full rounded bg-gray-700 md:w-1/2" />
        <div className="flex gap-4">
          <div className="h-10 w-20 rounded-md bg-gray-600 sm:w-24" />
          <div className="h-10 w-24 rounded-md bg-gray-600 sm:w-32" />
        </div>
      </div>
    </div>
  );
}
