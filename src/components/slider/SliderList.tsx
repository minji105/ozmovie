import SliderSection from '@/components/slider/SliderSection';
import type { MediaListItem } from '@/types';

type Slider = {
  title: string;
  data: MediaListItem[];
  loading: boolean;
};

type SliderListProps = {
  sliders: Slider[];
};

export default function SliderList({ sliders }: SliderListProps) {
  return (
    <>
      {sliders.map(
        (slider, idx) =>
          !slider.loading && (
            <SliderSection key={idx} title={slider.title} data={slider.data} />
          ),
      )}
    </>
  );
}
