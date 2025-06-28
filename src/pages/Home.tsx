import { useSearchParams } from 'react-router-dom';
import Banner from '@/components/Banner';
import Sliders from '@/components/Sliders';
import DetailModal from '@/components/DetailModal';

export default function Home() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  return (
    <>
      <Banner />
      <Sliders />
      {type && id && <DetailModal type={type} id={id} />}
    </>
  );
}
