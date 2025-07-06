import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { useDetailModal } from '@/hooks/useDetailModal';
import Banner from '@/components/Banner';
import DetailModal from '@/components/detailModal/DetailModal';
import SliderList from '@/components/slider/SliderList';

type Movie = MediaItem;

type FetchResponse = {
  results: Movie[];
};

export default function Home() {
  const { type, id, closeModal } = useDetailModal();

  const { data: popularMovieData, loading: popularMovieLoading } =
    useFetch<FetchResponse>(
      'movie/popular?include_adult=false&language=ko&page=1',
    );
  const { data: onTheAirData, loading: onTheAirLoading } =
    useFetch<FetchResponse>('tv/on_the_air?language=ko&page=1');
  const { data: seriesUSData, loading: seriesUSLoading } =
    useFetch<FetchResponse>(
      'discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko&page=1&sort_by=popularity.desc&with_origin_country=US',
    );

  const sliders = [
    {
      title: '인기 영화',
      data:
        popularMovieData?.results.map(el => ({
          id: el.id,
          media_type: 'movie' as const,
          title: el.title || el.name || '',
          poster_path: el.poster_path,
        })) || [],
      loading: popularMovieLoading,
    },
    {
      title: '매주 공개! 이건 꼭 봐야 해',
      data:
        onTheAirData?.results.map(el => ({
          id: el.id,
          media_type: 'tv' as const,
          title: el.title || el.name || '',
          poster_path: el.poster_path,
        })) || [],
      loading: onTheAirLoading,
    },
    {
      title: '미국 드라마',
      data:
        seriesUSData?.results.map(el => ({
          id: el.id,
          media_type: 'tv' as const,
          title: el.title || el.name || '',
          poster_path: el.poster_path,
        })) || [],
      loading: seriesUSLoading,
    },
  ];

  return (
    <>
      <Banner />

      <div className="mt-[-64px] w-full md:mt-[-72px] xl:mt-[-100px]">
        <SliderList sliders={sliders} />
      </div>

      {type && id && (
        <DetailModal
          type={type as 'movie' | 'tv'}
          id={id}
          onClose={closeModal}
        />
      )}
    </>
  );
}
