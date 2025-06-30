import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import type { MediaItem } from '@/types';
import MediaCard from '@/components/MediaCard';
import SkeletonCard from '@/components/skeletons/SkeletonCard';
import DetailModal from '@/components/detailModal/DetailModal';

interface SearchResponse {
  results: MediaItem[];
  page: number;
  total_pages: number;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const type = searchParams.get('type');
  const id = searchParams.get('id');

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

  const closeModal = () => {
    searchParams.delete('type');
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full px-[5vw] pb-20 pt-[100px]">
      <p className="fixed top-0 w-full bg-black pb-4 pt-[100px] text-base sm:text-lg lg:text-xl">
        `{keyword}` 검색 결과: {len}개{isEnd ? '' : '+'}
      </p>
      <div className="grid grid-cols-3 gap-[calc(1vw+8px)] pt-10 sm:grid-cols-4 sm:pt-16 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {resultList.map((media: MediaItem) => (
          <MediaCard
            key={media.id}
            title={media.title || media.name || ''}
            imgSrc={media.poster_path}
            path={`/search?keyword=${keyword}&type=${media.media_type}&id=${media.id}`}
          />
        ))}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>

      {type && id && <DetailModal type={type} id={id} onClose={closeModal} />}

      <div ref={loader} />
    </div>
  );
}
