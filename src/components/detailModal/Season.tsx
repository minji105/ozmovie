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
      <div className="flex justify-between">
        <h2 className="text-xl">회차</h2>

        <select
          id="season"
          name="season"
          value={selectedSeason}
          onChange={e => setSelectedSeason(Number(e.target.value))}
          className="rounded border border-stone-500 bg-stone-800 px-2 py-2 outline-none"
        >
          {Array.from({ length: seriesLength }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              시즌 {i + 1}
            </option>
          ))}
        </select>
      </div>

      {seasonData && !loading && (
        <div className="divide-y divide-gray-600">
          {seasonData.episodes?.map((episode, index) => {
            const { runtime } = parseMediaInfo(episode, 'tv');

            return (
              <div
                key={episode.id}
                className="flex cursor-pointer items-center gap-4 p-8 hover:bg-stone-800"
              >
                <p className="text-xl text-gray-300">{index + 1}</p>
                <img
                  src={`${BASE_URL}${episode.still_path}`}
                  alt={episode.name}
                  className="w-[25%]"
                />
                <div className="flex w-full flex-col gap-2">
                  <p className="font-semibold">{episode.name}</p>
                  <div className="flex justify-between text-sm text-gray-300">
                    <p>{episode.air_date}</p>
                    <p>{runtime}</p>
                  </div>
                  <p className="text-sm text-gray-100">{episode.overview}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
