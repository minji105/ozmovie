import { useFavorites } from '@/contexts/FavoriteContext';
import DetailModal from '@/components/detailModal/DetailModal';
import { useDetailModal } from '@/hooks/useDetailModal';
import { useAuth } from '@/contexts/AuthContext';
import { useLikes } from '@/contexts/LikeContext';
import SliderList from '@/components/slider/SliderList';

export default function Mypage() {
  const { user } = useAuth();
  const { type, id, closeModal } = useDetailModal();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { likes, loading: likesLoading } = useLikes();

  const sliders = [
    {
      title: '내가 찜한 리스트',
      data: favorites || [],
      loading: favoritesLoading,
      emptyMessage: '아직 찜하신 콘텐츠가 없습니다.',
    },
    {
      title: '마음에 들어 하신 시리즈와 영화',
      data: likes || [],
      loading: likesLoading,
      emptyMessage: '아직 좋아요한 콘텐츠가 없습니다.',
    },
  ];

  console.log(user);

  return (
    <>
      <div className="m-auto flex w-20 flex-col items-center gap-2 pb-16 pt-20">
        <img
          className="w-full rounded-md"
          src={user?.user_metadata.avatar_url || 'src/assets/profile.png'}
          alt="user profile image"
        />
        <p className="text-xl">{user?.user_metadata.name}</p>
      </div>

      <div className="w-full">
        <SliderList sliders={sliders} />
      </div>

      {type && id && (
        <DetailModal
          type={type as 'movie' | 'tv'}
          id={id}
          onClose={closeModal}
        />
      )}
    </>
  );
}
