export default function SkeletonBanner() {
  return (
    <div className="banner-responsive relative animate-pulse">
      <div className="banner-responsive banner-gradient fixed z-0 w-full bg-gray-900" />
      <div className="banner-info">
        <div className="h-[5vw] w-1/3 rounded bg-gray-600" />
        <div className="h-[calc(1vw+4px)] w-1/2 rounded bg-gray-700" />
        <div className="h-[calc(1vw+4px)] w-[calc(100%-5vw)] rounded bg-gray-700 md:w-[calc(50%-5vw)]" />
        <div className="h-[calc(1vw+4px)] w-[calc(100%-5vw)] rounded bg-gray-700 md:w-[calc(50%-5vw)]" />
        <div className="flex gap-4">
          <div className="h-[calc(3.6vw+6px)] w-[calc(6.2vw+40px)] rounded-lg bg-gray-600" />
          <div className="h-[calc(3.6vw+6px)] w-[calc(6.2vw+72px)] rounded-lg bg-gray-600" />
        </div>
      </div>
    </div>
  );
}
