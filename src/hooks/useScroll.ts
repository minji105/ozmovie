import { useEffect, useRef, useState } from 'react';

const THROTTLE_DELAY = 200;

export default function useScroll(): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;

      if (throttleTimeout.current) {
        return;
      }

      throttleTimeout.current = setTimeout(() => {
        setIsScrolled(lastScrollY.current > 0);
        throttleTimeout.current = null;
      }, THROTTLE_DELAY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}
