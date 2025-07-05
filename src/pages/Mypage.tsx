import { useFavorites } from '@/contexts/FavoriteContext';
import MediaCard from '@/components/MediaCard';
import DetailModal from '@/components/detailModal/DetailModal';
import { useDetailModal } from '@/hooks/useDetailModal';
import { useLikes } from '@/contexts/LikeContext';

export default function Mypage() {
  const { type, id, closeModal } = useDetailModal();
  const { favorites } = useFavorites();
  const { likes } = useLikes();

  return (
    <>
      <h2>내가 찜한 리스트</h2>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {favorites.map(item => (
          <MediaCard
            key={item.id}
            title={item.title}
            imgSrc={item.poster_path || ''}
            path={`?type=${item.media_type}&id=${item.id}`}
          />
        ))}
      </div>

      <h2>마음에 들어 하신 시리즈와 영화</h2>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {likes.map(item => (
          <MediaCard
            key={item.id}
            title={item.title}
            imgSrc={item.poster_path || ''}
            path={`?type=${item.media_type}&id=${item.id}`}
          />
        ))}
      </div>

      {type && id && <DetailModal type={type} id={id} onClose={closeModal} />}
    </>
  );
}
