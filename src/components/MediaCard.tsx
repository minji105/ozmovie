import { BASE_URL } from '@/constants';

type MediaCardProps = {
  title: string;
  imgSrc: string;
};

export default function MediaCard({ title, imgSrc }: MediaCardProps) {
  return (
    <img
      className="aspect-[0.7] rounded-sm object-cover"
      src={`${BASE_URL}${imgSrc}`}
      alt={title}
    />
  );
}
