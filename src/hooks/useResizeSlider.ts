import { useState, useEffect } from 'react';

export default function useResizeSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 480) setCardsPerPage(3);
      else if (width < 600) setCardsPerPage(4);
      else if (width < 768) setCardsPerPage(5);
      else if (width < 1024) setCardsPerPage(6);
      else setCardsPerPage(7);

      setCurrentPage(0);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { currentPage, setCurrentPage, cardsPerPage };
}
