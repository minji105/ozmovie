import type { MediaListItem } from '@/types';
import useResizeSlider from '@/hooks/useResizeSlider';
import MediaCard from '@/components/MediaCard';
import { useRef } from 'react';

interface SliderSectionProps {
  data: MediaListItem[];
  title: string;
  type: string | null;
}

export default function SliderSection({
  data,
  title,
  type,
}: SliderSectionProps) {
  const { currentPage, setCurrentPage, cardsPerPage } = useResizeSlider();

  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(data.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="responsive-spacing group relative mb-5 w-full overflow-hidden md:mb-8">
      <h3 className="mb-1 text-lg md:mb-2 md:text-xl">{title}</h3>

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
            <MediaCard
              title={el.title || ''}
              imgSrc={el.poster_path || ''}
              path={`?type=${type || el.media_type}&id=${el.id}`}
            />
          </div>
        ))}
      </div>

      <button
        className="slider-button left-0 rounded-r-sm"
        onClick={handlePrev}
        style={{ opacity: currentPage === 0 ? '0' : '1' }}
      >
        &lt;
      </button>

      <button
        className="slider-button right-0 rounded-l-sm"
        onClick={handleNext}
        style={{ opacity: currentPage === totalPages - 1 ? '0' : '1' }}
      >
        &gt;
      </button>
    </div>
  );
}
