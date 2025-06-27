export function parseMediaInfo(media: any, media_type: string) {
  const title = media.title || media.name;

  const originalTitle = media.original_title || media.original_name;

  const year =
    media_type === 'tv'
      ? media.first_air_date?.split('-')[0]
      : media.release_date?.split('-')[0];

  let overview = '';
  if (media.overview) {
    const overviewSentences = media.overview.split('. ');
    overview =
      overviewSentences.length > 3
        ? overviewSentences.slice(0, 3).join('. ') + '...'
        : media.overview;
  }

  return { title, originalTitle, year, overview };
}
