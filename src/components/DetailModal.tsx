import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { BASE_URL_ORIGIN } from '@/constants';
import { parseMediaInfo } from '@/utils/parseMediaInfo';
import Button from './common/Button';
import { useEffect } from 'react';

interface Props {
  type: string;
  id: number;
}

export default function DetailModal({ type, id }: Props) {
  const { data, loading } = useFetch<MediaItem>(`${type}/${id}?language=ko`);
  console.log('media: ', data);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading || !data) return null;

  const { title, year, runtimeOrSeasons } = parseMediaInfo(data, type);

  return (
    // 모달 배경
    <div className="fixed left-0 top-0 z-[1000] h-full w-full overflow-y-scroll bg-black/80 py-10">
      {/* 모달 */}
      <div className="relative m-auto max-w-4xl overflow-hidden rounded-md bg-stone-900 pb-[100px]">
        {/* 상단 백드랍 이미지 및 제목 */}
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
        </div>

        {/* 정보 */}
        <div className="flex flex-col gap-2 px-10 pt-2">
          <p className="text-gray-200">
            {year}
            <span className="mx-4">·</span>
            {runtimeOrSeasons}
          </p>
          <div className="flex items-center gap-2">
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
          <p className="mt-6 text-lg italic">"{data.tagline}"</p>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}
