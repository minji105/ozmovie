import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import type { MediaItem } from '@/types';
import MediaCard from '@/components/MediaCard';
import SkeletonCard from '@/components/skeletons/SkeletonCard';

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
    <div className="w-full px-[5vw] pb-20 pt-[100px]">
      <p className="fixed top-0 w-full bg-black pt-[100px] text-base sm:pb-4 sm:text-lg lg:text-xl">
        `{keyword}` 검색 결과: {len}개{isEnd ? '' : '+'}
      </p>
      <div className="grid grid-cols-3 gap-[calc(1vw+8px)] pt-10 sm:grid-cols-4 sm:pt-16 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {resultList.map((media: MediaItem) => (
          <Link to="/" key={`${media.media_type}-${media.id}`}>
            <MediaCard
              title={media.title || media.name || ''}
              imgSrc={media.poster_path}
            />
          </Link>
        ))}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>

      <div ref={loader} />
    </div>
  );
}
