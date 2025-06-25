import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import type { MediaItem } from '@/types';
import MediaCard from '@/components/MediaCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface SearchResponse {
  results: MediaItem[];
  page: number;
  total_pages: number;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [resultList, setResultList] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const { data, loading } = useFetch<SearchResponse>(
    `search/multi?query=${keyword}&include_adult=false&language=ko&page=${page}`,
  );

  const loader = useInfiniteScroll(
    () => setPage(prev => prev + 1),
    !loading && !isEnd,
  );

  useEffect(() => {
    setPage(1);
    setResultList([]);
    setIsEnd(false);
  }, [keyword]);

  useEffect(() => {
    if (data?.results) {
      const filtered = data.results.filter(el => el.backdrop_path);
      setResultList(prev => [...prev, ...filtered]);

      if (data.page >= data.total_pages) setIsEnd(true);
    }
  }, [data]);

  const len = resultList.length;

  return (
    <div className="py-10">
      <p className="fixed bg-black p-4 text-2xl">{len}</p>
      {!loading &&
        resultList.map((media: MediaItem) => (
          <MediaCard
            key={media.id}
            title={media.title || media.name || ''}
            imgSrc={media.poster_path}
          />
        ))}
      <div ref={loader} />
    </div>
  );
}
