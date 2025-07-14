import { useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import {
  IoAddCircleOutline,
  IoCheckmarkCircle,
  IoHeartCircleOutline,
  IoHeartCircle,
} from 'react-icons/io5';
import type { MediaItem, MediaListItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { BASE_URL_ORIGIN } from '@/constants';
import { parseMediaInfo } from '@/utils/parseMediaInfo';
import Button from '@/components/common/Button';
import Recommendation from '@/components/detailModal/Recommendation';
import Season from '@/components/detailModal/Season';
import { useFavorites } from '@/contexts/FavoriteContext';
import { useLikes } from '@/contexts/LikeContext';

interface Props {
  type: 'movie' | 'tv';
  id: string;
  onClose: () => void;
}

interface RecommendationsResponse {
  results: MediaItem[];
}

export default function DetailModal({ type, id, onClose }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLiked, toggleLike } = useLikes();
  const { data, loading } = useFetch<MediaItem>(`${type}/${id}?language=ko`);

  const { data: recommendationData } = useFetch<RecommendationsResponse>(
    `${type}/${id}/recommendations?language=ko`,
  );

  const item: MediaListItem = {
    id: Number(id),
    media_type: type,
    title: data?.title || data?.name || '',
    poster_path: data?.poster_path || '',
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading || !data) return null;

  const { title, year, seasons, runtime } = parseMediaInfo(data, type);

  return (
    // 모달 배경
    <div className="fixed left-0 top-0 z-[1000] h-full w-full overflow-y-scroll bg-black/80 px-3 py-10 sm:px-10">
      {/* 모달 */}
      <div className="relative m-auto max-w-4xl overflow-hidden rounded-md bg-stone-900 pb-10">
        {/* 상단 백드랍 이미지 및 제목, 닫기 버튼 */}
        <div className="relative aspect-[1.2] w-full sm:aspect-[1.8]">
          {data.backdrop_path ? (
            <img
              src={`${BASE_URL_ORIGIN}${data.backdrop_path}`}
              alt={title}
              className="h-full w-full object-cover brightness-[90%]"
            />
          ) : (
            <div className="h-full w-full bg-stone-600" />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-900 to-transparent" />

          <div className="responsive-spacing absolute bottom-10 left-0">
            <h1 className="mb-10 break-keep text-4xl font-black sm:text-5xl">
              {title}
            </h1>
            <p className="mb-2">★ {data.vote_average.toFixed(1)}</p>
            <div className="flex gap-2">
              <Button variant="playSmall">
                <span className="mr-4">▶</span>재생
              </Button>
              <button
                className="m-0 rounded-full bg-transparent stroke-[1px] p-0 text-5xl"
                onClick={() => toggleFavorite(item)}
              >
                {isFavorite(Number(id)) ? (
                  <IoCheckmarkCircle />
                ) : (
                  <IoAddCircleOutline />
                )}
              </button>
              <button
                className="m-0 rounded-full bg-transparent stroke-[1px] p-0 text-5xl"
                onClick={() => toggleLike(item)}
              >
                {isLiked(Number(id)) ? (
                  <IoHeartCircle />
                ) : (
                  <IoHeartCircleOutline />
                )}
              </button>
            </div>
          </div>

          <button
            className="path-white absolute right-0 top-0 m-spacingSm text-4xl md:m-spacingMd lg:m-spacingLg"
            onClick={onClose}
          >
            <IoMdCloseCircle />
          </button>
        </div>

        {/* 본문 */}
        <div className="responsive-spacing flex flex-col gap-10 pt-2 text-sm sm:text-base">
          <div className="flex flex-col gap-2">
            <p className="text-gray-200">
              {year}
              <span className="mx-2">·</span>
              {seasons || runtime}
            </p>
            <div className="mb-5 flex gap-2">
              <p className="break-keep py-1">장르:</p>
              <div className="flex flex-wrap gap-2">
                {data.genres.map(tag => (
                  <p
                    key={tag.id}
                    className="rounded-md bg-stone-700 px-2 py-1 text-sm"
                  >
                    {tag.name}
                  </p>
                ))}
              </div>
            </div>
            {data.tagline && <p className="text-lg italic">"{data.tagline}"</p>}
            <p className="break-keep">{data.overview}</p>
          </div>

          {type === 'tv' ? (
            <Season id={data.id} seriesLength={data.seasons.length} />
          ) : null}

          {recommendationData?.results?.length ? (
            <Recommendation data={recommendationData} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
