import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Banner from '@/components/Banner';
import Sliders from '@/components/Sliders';
import DetailModal from '@/components/detailModal/DetailModal';

export default function Home() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Banner />
      <Sliders />
      {type && id && (
        <DetailModal
          type={type}
          id={id}
          onClose={() => navigate(location.pathname)}
        />
      )}
    </>
  );
}
