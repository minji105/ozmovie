import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';

export default function useSearchRouting() {
  const [inputDebounce, setInputDebounce] = useState<string>('');
  const debouncedValue = useDebounce(inputDebounce);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search?keyword=${debouncedValue}`);
      console.log('keyword: ', debouncedValue);
    } else if (location.pathname.startsWith('/search')) {
      navigate('/');
    }
  }, [debouncedValue, location.pathname, navigate]);

  return { inputDebounce, setInputDebounce };
}
