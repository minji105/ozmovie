import { useFavorites } from '@/contexts/FavoriteContext';
import MediaCard from '@/components/MediaCard';
import DetailModal from '@/components/detailModal/DetailModal';
import { useDetailModal } from '@/hooks/useDetailModal';

export default function Mypage() {
  const { type, id, closeModal } = useDetailModal();
  const { favorites, loading } = useFavorites();

  if (loading) return <p className="text-center text-white">불러오는 중...</p>;

  if (favorites.length === 0)
    return <p className="text-center text-gray-400">찜한 콘텐츠가 없습니다.</p>;

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

      {type && id && <DetailModal type={type} id={id} onClose={closeModal} />}
    </>
  );
}
