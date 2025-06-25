import { useSearchParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import type { MediaItem } from '@/types';
import MediaCard from '@/components/MediaCard';

interface SearchResponse {
  results: MediaItem[];
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data, loading } = useFetch<SearchResponse>(
    `search/multi?query=${keyword}&include_adult=false&language=ko`,
  );

  const filtered = data?.results?.filter(el => el.backdrop_path) || [];

  return (
    <>
      {!loading &&
        filtered.map((media: MediaItem, index: number) => (
          <MediaCard
            key={index}
            title={media.title || media.name || ''}
            imgSrc={media.poster_path}
          />
        ))}
    </>
  );
}
