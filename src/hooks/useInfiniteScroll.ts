import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(
  callback: () => void,
  canLoad: boolean,
) {
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && canLoad) {
        callback();
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [callback, canLoad]);

  return loader;
}
