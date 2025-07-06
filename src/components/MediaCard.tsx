import { BASE_URL } from '@/constants';
import type { MediaListItem } from '@/types';
import { Link } from 'react-router-dom';

type MediaCardProps = {
  item: MediaListItem;
};

export default function MediaCard({ item }: MediaCardProps) {
  return (
    item && (
      <Link to={`?type=${item.media_type}&id=${item.id}`}>
        <img
          className="aspect-[0.7] rounded-sm object-cover"
          src={`${BASE_URL}${item.poster_path}`}
          alt={item.title}
        />
      </Link>
    )
  );
}
