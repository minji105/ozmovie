import Banner from '@/components/Banner';
import Sliders from '@/components/Sliders';
import DetailModal from '@/components/detailModal/DetailModal';
import { useDetailModal } from '@/hooks/useDetailModal';

export default function Home() {
  const { type, id, closeModal } = useDetailModal();

  return (
    <>
      <Banner />
      <Sliders />
      {type && id && <DetailModal type={type} id={id} onClose={closeModal} />}
    </>
  );
}
