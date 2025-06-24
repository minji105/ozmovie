import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BASE_URL_ORIGIN } from '@constants/index';
import useFetch from '@/hooks/useFetch';
import useAutoRotation from '@/hooks/useAutoRotation';
import SkeletonBanner from '@components/skeletons/SkeletonBanner';

interface MediaItem {
  id: number;
  media_type: 'tv' | 'movie' | string;
  title?: string;
  name?: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  original_title?: string;
  original_name?: string;
  first_air_date: string;
  release_date: string;
  overview: string;
}

interface TrendingResponse {
  results: MediaItem[];
}

export default function Banner() {
  const { data, loading } = useFetch<TrendingResponse>(
    'trending/all/day?language=ko&include_adult=false',
  );

  const trendingMediaList =
    data?.results.filter(
      el => el.media_type === 'tv' || el.media_type === 'movie',
    ) ?? [];

  const { currentIndex, isVisible } = useAutoRotation(trendingMediaList);

  const media = trendingMediaList?.[currentIndex];
  const nodeRef = useRef<HTMLDivElement>(null);

  if (loading || !media) return <SkeletonBanner />;

  return (
    <CSSTransition
      in={isVisible}
      timeout={1000}
      classNames="fade"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="relative aspect-[1] sm:aspect-[1.4] lg:aspect-[1.8]"
      >
        <div className="fixed w-full aspect-[1] sm:aspect-[1.4] lg:aspect-[1.8] z-0">
          <img
            className="w-full aspect-[1] sm:aspect-[1.4] lg:aspect-[1.8] object-cover "
            src={`${BASE_URL_ORIGIN}${media.backdrop_path}`}
            alt={media.title || media.name || ''}
          />
          <div
            className="absolute inset-0
                      bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.7)_0px,_rgba(0,0,0,0.3)_80px,_rgba(0,0,0,0.3)_calc(100%-80px),_rgba(0,0,0,1)_100%)]"
          />
        </div>

        <div className="flex flex-col gap-4 lg:gap-6 absolute bottom-[20vw] md:bottom-[14vw] z-20 w-[calc(100%-5vw)] mx-[5vw]">
          <p className="text-[5vw] font-black">{media.title || media.name}</p>
          <div className="text-[calc(1vw+4px)]">
            <span className="mr-12">
              ★ {media.vote_average.toFixed(1)}&nbsp;&nbsp;|&nbsp;&nbsp;{' '}
              {media.vote_count}
            </span>
            <span className="text-gray-300">
              {media.original_title || media.original_name}
              &nbsp;&nbsp;·&nbsp;&nbsp;
              {media.media_type === 'tv'
                ? media.first_air_date.split('-')[0]
                : media.release_date.split('-')[0]}
            </span>
          </div>
          <p className="w-[calc(100%-5vw)] md:w-[calc(50%-5vw)] text-[calc(1vw+4px)] text-gray-300 break-keep leading-[calc(1vw+10px)]">
            {media.overview.split('. ').length > 3
              ? media.overview.split('. ').slice(0, 3).join('. ') + '...'
              : media.overview}
          </p>
          <div>
            <button
              className="mr-4 py-[1.3vw] px-[2.6vw] rounded-lg bg-white text-[calc(1vw+6px)] text-black transition-all duration-[3000]
                              hover:text-white hover:bg-blue-600"
            >
              ▶&nbsp;&nbsp;재생
            </button>
            <button
              className="py-[1.3vw] px-[2.6vw] rounded-lg bg-[#c0c0c070] text-[calc(1vw+6px)] transition-all duration-[3000]
                              hover:bg-[#c0c0c0a7]"
            >
              ⓘ&nbsp;&nbsp;상세 정보
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
