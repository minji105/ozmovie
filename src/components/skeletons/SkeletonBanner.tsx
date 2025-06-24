export default function SkeletonBanner() {
  return (
    <div className="relative aspect-[1] sm:aspect-[1.4] lg:aspect-[1.8] animate-pulse">
      <div className="fixed w-full aspect-[1] sm:aspect-[1.4] lg:aspect-[1.8] z-0 bg-gray-900" />
      <div className="flex flex-col gap-4 lg:gap-6 absolute bottom-[20vw] md:bottom-[14vw] z-20 w-[calc(100%-5vw)] mx-[5vw]">
        <div className="h-[5vw] w-1/3 bg-gray-600 rounded" />
        <div className="h-[calc(1vw+4px)] w-1/2 bg-gray-700 rounded" />
        <div className="h-[calc(1vw+4px)] w-[calc(100%-5vw)] md:w-[calc(50%-5vw)] bg-gray-700 rounded" />
        <div className="h-[calc(1vw+4px)] w-[calc(100%-5vw)] md:w-[calc(50%-5vw)] bg-gray-700 rounded" />
        <div className="flex gap-4">
          <div className="h-[calc(3.6vw+6px)] w-[calc(6.2vw+40px)] bg-gray-600 rounded-lg" />
          <div className="h-[calc(3.6vw+6px)] w-[calc(6.2vw+72px)] bg-gray-600 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
