import useFetch from '@/hooks/useFetch';

interface TrendingResponse {
  results: MediaItem[];
}

interface MediaItem {
  id: number;
  media_type: 'tv' | 'movie' | string;
  title?: string;
  name?: string;
}

export default function Banner() {
  const { data, loading } = useFetch<TrendingResponse>(
    'trending/all/day?language=ko&include_adult=false',
  );

  const trendingMediaList =
    data?.results.filter(
      el => el.media_type === 'tv' || el.media_type === 'movie',
    ) ?? [];

  return (
    <>
      {trendingMediaList.map(media => (
        <p key={media.id}>{media.name || media.title}</p>
      ))}
    </>
  );
}
