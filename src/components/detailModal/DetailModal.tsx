import { useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { BASE_URL_ORIGIN } from '@/constants';
import { parseMediaInfo } from '@/utils/parseMediaInfo';
import Button from '@/components/common/Button';
import Recommendation from '@/components/detailModal/Recommendation';
import Season from '@/components/detailModal/Season';

interface Props {
  type: string;
  id: string;
  onClose: () => void;
}

interface RecommendationsResponse {
  results: MediaItem[];
}

export default function DetailModal({ type, id, onClose }: Props) {
  const { data, loading } = useFetch<MediaItem>(`${type}/${id}?language=ko`);

  const { data: recommendationData } = useFetch<RecommendationsResponse>(
    `${type}/${id}/recommendations?language=ko`,
  );

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
    <div className="fixed left-0 top-0 z-[1000] h-full w-full overflow-y-scroll bg-black/80 px-5 py-10">
      {/* 모달 */}
      <div className="relative m-auto max-w-4xl overflow-hidden rounded-md bg-stone-900 pb-5">
        {/* 상단 백드랍 이미지 및 제목, 닫기 버튼 */}
        <div className="relative h-[440px] w-full">
          <img
            src={`${BASE_URL_ORIGIN}${data.backdrop_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-900 to-transparent" />

          <div className="absolute bottom-10 left-10">
            <h1 className="mb-10 text-6xl font-black">{title}</h1>
            <p className="mb-2">★ {data.vote_average.toFixed(1)}</p>
            <Button variant="playSmall">
              <span className="mr-4">▶</span>재생
            </Button>
          </div>

          <button
            className="path-white absolute right-10 top-10 text-4xl"
            onClick={onClose}
          >
            <IoMdCloseCircle />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-10 px-10 pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-200">
              {year}
              <span className="mx-2">·</span>
              {seasons || runtime}
            </p>
            <div className="mb-5 flex items-center gap-2">
              <p>장르:</p>
              {data.genres.map(tag => (
                <p
                  key={tag.id}
                  className="rounded-md bg-stone-700 px-2 py-1 text-sm"
                >
                  {tag.name}
                </p>
              ))}
            </div>
            {data.tagline && <p className="text-lg italic">"{data.tagline}"</p>}
            <p>{data.overview}</p>
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
