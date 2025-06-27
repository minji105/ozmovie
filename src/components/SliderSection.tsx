import type { MediaItem } from '@/types';
import MediaCard from '@/components/MediaCard';
import { useEffect, useRef, useState } from 'react';

interface SliderSectionProps {
  data: MediaItem[];
  title: string;
  type: string;
}

export default function SliderSection({
  data,
  title,
  type,
}: SliderSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(data.length / cardsPerPage);

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

  const slideTo = (page: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth / data.length;

    const moveX = cardWidth * cardsPerPage * page;
    container.style.transform = `translateX(-${moveX}px)`;

    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) slideTo(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) slideTo(currentPage - 1);
  };

  return (
    <div className="group relative mb-10 w-full overflow-hidden px-[5vw]">
      <h3 className="mb-4">{title}</h3>

      <div
        className="ease flex transition-transform duration-1000"
        ref={containerRef}
        style={{
          width: `${(data.length / cardsPerPage) * 100}%`,
        }}
      >
        {data.map(el => (
          <div
            key={el.id}
            style={{
              flex: `0 0 ${100 / data.length}%`,
              padding: '4px',
            }}
          >
            <MediaCard title={el.title || ''} imgSrc={el.poster_path} />
          </div>
        ))}
      </div>

      <button
        className="absolute left-0 top-[40px] z-10 h-[calc(100%-40px)] w-[5vw] rounded-r-sm bg-black/50 text-3xl text-transparent transition-all duration-200 ease-in-out hover:bg-black/80 hover:text-4xl hover:text-white group-hover:bg-black/80 group-hover:text-white"
        onClick={handlePrev}
        style={{ opacity: currentPage === 0 ? '0' : '1' }}
      >
        &lt;
      </button>

      <button
        className="absolute right-0 top-[40px] z-10 h-[calc(100%-40px)] w-[5vw] rounded-l-sm bg-black/50 text-3xl text-transparent transition-all duration-200 ease-in-out hover:bg-black/80 hover:text-4xl hover:text-white group-hover:bg-black/80 group-hover:text-white"
        onClick={handleNext}
        style={{ opacity: currentPage === totalPages - 1 ? '0' : '1' }}
      >
        &gt;
      </button>
    </div>
  );
}
