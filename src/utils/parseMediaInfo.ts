export function parseMediaInfo(
  media: any,
  media_type: string,
  maxSentence: number = 3,
) {
  const title = media.title || media.name;

  const originalTitle = media.original_title || media.original_name;

  const year =
    media_type === 'tv'
      ? media.first_air_date?.split('-')[0]
      : media.release_date?.split('-')[0];

  let overview = '';
  if (media.overview) {
    const overviewSentences = media.overview.match(/[^.!?]+[.!?]+/g) || [];
    overview =
      overviewSentences.length > maxSentence
        ? overviewSentences.slice(0, maxSentence).join(' ') + '...'
        : media.overview;
  }

  const seasons =
    media_type === 'tv' ? `시즌 ${media.number_of_seasons}개` : null;

  const runtime =
    media.runtime >= 60
      ? `${Math.floor(media.runtime / 60)}시간 ${media.runtime % 60}분`
      : `${media.runtime % 60}분`;

  return { title, originalTitle, year, overview, seasons, runtime };
}
