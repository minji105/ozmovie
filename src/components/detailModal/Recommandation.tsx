import MediaCard from '../MediaCard';

export default function Recommandation({ data }: { data: any }) {
  return (
    <>
      <h2 className="mt-10 text-xl">함께 시청된 콘텐츠</h2>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-6">
        {data.results.map((el: any) => (
          <MediaCard key={el.id} title={el.title} imgSrc={el.poster_path} />
        ))}
      </div>
    </>
  );
}
