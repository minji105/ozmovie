import MediaCard from '../MediaCard';

export default function Recommendation({ data }: { data: any }) {
  return (
    <section>
      <h2 className="mb-5 inline-block border-b-4 border-red-700 pb-2 text-xl sm:mb-6">
        함께 시청된 콘텐츠
      </h2>
      <div className="grid grid-cols-[repeat(3,1fr)] gap-3 sm:grid-cols-[repeat(4,1fr)] sm:gap-4">
        {data?.results.map((item: any) => (
          <MediaCard item={item} />
        ))}
      </div>
    </section>
  );
}
