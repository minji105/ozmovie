import SliderSection from '@/components/slider/SliderSection';
import type { MediaListItem } from '@/types';

type Slider = {
  title: string;
  data: MediaListItem[];
  loading: boolean;
  emptyMessage?: string;
};

type SliderListProps = {
  sliders: Slider[];
};

export default function SliderList({ sliders }: SliderListProps) {
  return (
    <>
      <div className="mb-5 flex w-full flex-col gap-8 overflow-hidden md:mb-8">
        {sliders.map((slider, index) => (
          <section key={index} className="responsive-spacing group relative">
            <h3 className="mb-1 text-lg md:mb-2 md:text-xl">{slider.title}</h3>

            {!slider.loading && slider.data.length === 0 ? (
              <div className="w-full rounded-sm bg-stone-900/60 py-14 xs:py-20 lg:py-32">
                <p className="text-center text-sm text-gray-200">
                  {slider.emptyMessage}
                </p>
              </div>
            ) : (
              <SliderSection key={index} data={slider.data} />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
