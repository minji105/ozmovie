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
      <div className="flex items-start justify-between">
        <h2 className="mb-2 border-b-4 border-red-700 pb-2 text-xl sm:mb-3">
          회차
        </h2>

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

      {seasonData?.episodes && !loading ? (
        <div className="divide-y divide-gray-600">
          {seasonData.episodes?.map((episode, index) => {
            const { overview, runtime } = parseMediaInfo(episode, 'tv', 2);

            return (
              <div
                key={episode.id}
                className="flex cursor-pointer flex-col gap-2 py-4 hover:bg-stone-800 xs:gap-4 md:p-8"
              >
                <div className="flex items-center gap-2 xs:gap-4">
                  <p className="hidden text-xl text-gray-300 sm:block">
                    {index + 1}
                  </p>
                  <img
                    src={`${BASE_URL}${episode.still_path}`}
                    alt={episode.name}
                    className="w-[35%] sm:w-[25%]"
                  />
                  <div className="flex w-full flex-col gap-1 xs:gap-2">
                    <p className="text-sm font-semibold sm:text-base">
                      {episode.name}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 xs:text-sm">
                      <p>{episode.air_date}</p>
                      <p>{runtime}</p>
                    </div>
                    <p className="hidden text-sm text-gray-100 sm:block">
                      {episode.overview}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-100 sm:hidden">{overview}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>회차 정보가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
