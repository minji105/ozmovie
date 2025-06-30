import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import SliderSection from '@/components/SliderSection';

type Movie = MediaItem;

type FetchResponse = {
  results: Movie[];
};

export default function Sliders() {
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
      data: popularMovieData?.results || [],
      loading: popularMovieLoading,
      type: 'movie',
    },
    {
      title: '매주 공개! 이건 꼭 봐야 해',
      data: onTheAirData?.results || [],
      loading: onTheAirLoading,
      type: 'tv',
    },
    {
      title: '미국 드라마',
      data: seriesUSData?.results || [],
      loading: seriesUSLoading,
      type: 'tv',
    },
  ];

  return (
    <div className="mt-[-64px] w-full md:mt-[-72px] xl:mt-[-100px]">
      {sliders.map(
        (slider, idx) =>
          !slider.loading && (
            <SliderSection
              key={idx}
              title={slider.title}
              data={slider.data}
              type={slider.type}
            />
          ),
      )}
    </div>
  );
}
