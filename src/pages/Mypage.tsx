import { useFavorites } from '@/contexts/FavoriteContext';
import DetailModal from '@/components/detailModal/DetailModal';
import { useDetailModal } from '@/hooks/useDetailModal';
import { useLikes } from '@/contexts/LikeContext';
import SliderSection from '@/components/SliderSection';

export default function Mypage() {
  const { type, id, closeModal } = useDetailModal();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { likes, loading: likesLoading } = useLikes();

  const sliders = [
    {
      title: '내가 찜한 리스트',
      data: favorites || [],
      loading: favoritesLoading,
    },
    {
      title: '마음에 들어 하신 시리즈와 영화',
      data: likes || [],
      loading: likesLoading,
    },
  ];

  return (
    <>
      <div className="w-full">
        {sliders.map(
          (slider, idx) =>
            !slider.loading && (
              <SliderSection
                key={idx}
                title={slider.title}
                data={slider.data}
              />
            ),
        )}
      </div>

      {type && id && <DetailModal type={type} id={id} onClose={closeModal} />}
    </>
  );
}
