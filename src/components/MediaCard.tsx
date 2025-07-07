import { BASE_URL } from '@/constants';
import type { MediaListItem } from '@/types';
import { Link } from 'react-router-dom';

type MediaCardProps = {
  item: MediaListItem;
  path?: string;
};

export default function MediaCard({ item, path }: MediaCardProps) {
  return (
    item && (
      <Link to={`${path ? path : '?'}type=${item.media_type}&id=${item.id}`}>
        <img
          className="aspect-[0.7] rounded-sm object-cover"
          src={`${BASE_URL}${item.poster_path}`}
          alt={item.title}
        />
      </Link>
    )
  );
}
