import { BASE_URL } from '@/constants';
import { Link } from 'react-router-dom';

type MediaCardProps = {
  title: string;
  imgSrc: string;
  path: string;
};

export default function MediaCard({ title, imgSrc, path }: MediaCardProps) {
  return (
    <Link to={path}>
      <img
        className="aspect-[0.7] rounded-sm object-cover"
        src={`${BASE_URL}${imgSrc}`}
        alt={title}
      />
    </Link>
  );
}
