import type { MediaListItem } from '@/types';
import useResizeSlider from '@/hooks/useResizeSlider';
import MediaCard from '@/components/MediaCard';
import { useRef } from 'react';

interface SliderSectionProps {
  data: MediaListItem[];
}

export default function SliderSection({ data }: SliderSectionProps) {
  const { currentPage, setCurrentPage, cardsPerPage } = useResizeSlider();

  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(data.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  console.log('slider list:', data);

  return (
    <>
      <div
        className="ease flex transition-transform duration-1000"
        ref={containerRef}
        style={{
          transform: `translateX(-${(100 / totalPages) * currentPage}%)`,
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
            <MediaCard item={el} />
          </div>
        ))}
      </div>

      <button
        className="slider-button left-0 rounded-r-sm"
        onClick={handlePrev}
        style={{ display: currentPage === 0 ? 'none' : 'block' }}
      >
        &lt;
      </button>

      <button
        className="slider-button right-0 rounded-l-sm"
        onClick={handleNext}
        style={{ display: currentPage === totalPages - 1 ? 'none' : 'block' }}
      >
        &gt;
      </button>
    </>
  );
}
