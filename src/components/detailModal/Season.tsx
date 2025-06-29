import { BASE_URL } from '@/constants';
import useFetch from '@/hooks/useFetch';
import type { SeasonItem } from '@/types';
import { parseMediaInfo } from '@/utils/parseMediaInfo';
import { useEffect, useState } from 'react';

interface Props {
  id: number;
  seriesLength: number;
}

export default function Season({ id, seriesLength }: Props) {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [seasonData, setSeasonData] = useState<SeasonItem | null>(null);

  const { data, loading } = useFetch<SeasonItem>(
    `/tv/${id}/season/${selectedSeason}?language=ko`,
  );

  useEffect(() => {
    if (data) {
      setSeasonData(data);
      console.log(data);
    }
  }, [data]);

  return (
    <section>
      <h2 className="mb-6 text-xl">회차</h2>

      <select
        value={selectedSeason}
        onChange={e => setSelectedSeason(Number(e.target.value))}
        className="ex mb-6 rounded border px-2 py-1 text-black"
      >
        {Array.from({ length: seriesLength }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            시즌 {i + 1}
          </option>
        ))}
      </select>

      {seasonData && (
        <div>
          <p>{seasonData.name}</p>
          {seasonData.episodes?.map(episode => {
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
      )}
    </section>
  );
}
