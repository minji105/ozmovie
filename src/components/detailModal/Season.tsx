import { BASE_URL } from '@/constants';
import useFetch from '@/hooks/useFetch';
import type { SeasonItem } from '@/types';
import { parseMediaInfo } from '@/utils/parseMediaInfo';

interface Props {
  id: number;
  seriesLength: number;
}

export default function Season({ id, seriesLength }: Props) {
  const seasonResults = Array.from({ length: seriesLength }, (_, i) =>
    useFetch<SeasonItem>(`/tv/${id}/season/${i + 1}?language=ko`),
  );

  console.log(seasonResults);

  return (
    <section>
      <h2 className="mb-6 text-xl">회차</h2>
      {seasonResults?.map(
        season =>
          season.data && (
            // 시즌
            <div key={season.data.id}>
              <p>{season.data.name}</p>
              {/* 에피소드 */}
              {season.data.episodes?.map(episode => {
                const { runtime } = parseMediaInfo(episode, 'tv');

                return (
                  <div key={episode.id} className="flex">
                    <img
                      src={`${BASE_URL}${episode.still_path}`}
                      alt={episode.name}
                    />
                    <div>
                      <p>{episode.name}</p>
                      <p>{episode.air_date}</p>
                      <p>{runtime}</p>
                      <p>{episode.overview}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ),
      )}
    </section>
  );
}
