import { useEffect, useState } from 'react';

export default function useAutoRotation<T>(list: T[]) {
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const changeMedia = (newMedia: number) => {
      setIsVisible(false);
      setTimeout(() => {
        setcurrentIndex(newMedia % list.length);
        setIsVisible(true);
      }, 300);
    };

    const interval = setInterval(() => {
      changeMedia(currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, list?.length]);

  return { currentIndex, isVisible };
}
