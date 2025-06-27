import { useParams } from 'react-router-dom';
import type { MediaItem } from '@/types';
import useFetch from '@/hooks/useFetch';
import { BASE_URL, BASE_URL_ORIGIN } from '@/constants';
import { parseMediaInfo } from '@/utils/parseMediaInfo';

export default function Detail() {
  const { type, id } = useParams() as { type: string; id: string };
  const { data, loading } = useFetch<MediaItem>(`${type}/${id}?language=ko`);
  console.log('media: ', data);

  if (loading || !data) return null;

  const { title, originalTitle, year } = parseMediaInfo(data, type);

  return (
    !loading && (
      <div className="relative grid grid-cols-[1fr_3fr] gap-10 px-[5vw] pt-[180px]">
        <div className="banner-responsive absolute z-[-1] w-full">
          <img
            className="banner-responsive w-full object-cover brightness-50"
            src={`${BASE_URL_ORIGIN}${data.backdrop_path}`}
            alt={title}
          />
          <div className="banner-gradient absolute inset-0" />
        </div>

        <div>
          <img src={`${BASE_URL}${data.poster_path}`} alt={title} />
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between">
            <h1 className="text-5xl font-black">{title}</h1>
            <p>★ {data.vote_average.toFixed(1)}</p>
          </div>
          <p className="text-gray-200">
            {originalTitle}
            <span className="mx-4">·</span>
            {year}
          </p>

          <div className="my-10 flex gap-4">
            {data.genres.map(tag => (
              <p
                key={tag.id}
                className="rounded-lg bg-[#909090a0] px-4 py-2 text-sm"
              >
                {tag.name}
              </p>
            ))}
          </div>

          <p className="mb-4 text-lg italic">"{data.tagline}"</p>
          <p>{data.overview}</p>
        </div>
      </div>
    )
  );
}
