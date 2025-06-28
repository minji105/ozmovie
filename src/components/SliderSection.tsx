import type { MediaItem } from '@/types';
import useResizeSlider from '@/hooks/useResizeSlider';
import MediaCard from '@/components/MediaCard';
import { useRef } from 'react';

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
    <div className="group relative mb-10 w-full overflow-hidden px-[5vw]">
      <h3 className="mb-4">{title}</h3>

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
              imgSrc={el.poster_path}
              path={`?type=${type}&id=${el.id}`}
            />
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
