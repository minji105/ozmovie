import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { BASE_URL_ORIGIN } from '@/constants/index';
import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { parseMediaInfo } from '@/utils/parseMediaInfo';
import useAutoRotation from '@/hooks/useAutoRotation';
import SkeletonBanner from '@/components/skeletons/SkeletonBanner';
import Button from '@/components/common/Button';

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

  const { title, originalTitle, year, overview } = parseMediaInfo(
    media,
    media.media_type,
  );

  return (
    <CSSTransition
      in={isVisible}
      timeout={1000}
      classNames="fade"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="banner-responsive relative">
        <div className="banner-responsive w-full">
          <img
            className="banner-responsive w-full object-cover"
            src={`${BASE_URL_ORIGIN}${media.backdrop_path}`}
            alt={title}
          />
          <div className="banner-gradient absolute inset-0" />
        </div>

        <div className="banner-info">
          <p className="text-[5vw] font-black">{title}</p>
          <div className="text-[calc(1vw+4px)]">
            <span className="mr-12">
              ★ {media.vote_average.toFixed(1)}
              <span className="mx-4">|</span>
              {media.vote_count}
            </span>
            <span className="text-gray-300">
              {originalTitle}
              <span className="mx-4">·</span>
              {year}
            </span>
          </div>
          <p className="w-[calc(100%-5vw)] break-keep text-[calc(1vw+4px)] leading-[calc(1vw+10px)] text-gray-300 md:w-[calc(50%-5vw)]">
            {overview}
          </p>

          <div className="flex gap-4">
            <Button variant="play">
              <span className="mr-4">▶</span>재생
            </Button>
            <Link to={`?type=${media.media_type}&id=${media.id}`}>
              <Button variant="info">
                <span className="mr-4">ⓘ</span>상세 정보
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
