import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';

export default function useSearchRouting() {
  const [inputDebounce, setInputDebounce] = useState<string>('');
  const debouncedValue = useDebounce(inputDebounce);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    if (location.pathname !== '/search') {
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search?keyword=${debouncedValue}`);
      console.log('keyword: ', debouncedValue);
    } else if (location.pathname.startsWith('/search')) {
      navigate(prevPathRef.current);
    }
  }, [debouncedValue, location.pathname, navigate]);

  return { inputDebounce, setInputDebounce };
}
