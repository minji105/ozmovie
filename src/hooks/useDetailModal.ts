import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

export function useDetailModal() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    navigate(location.pathname);
  };

  return { type, id, closeModal };
}