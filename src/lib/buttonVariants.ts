import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex items-center justify-center rounded-md font-medium transition-colors duration-300',
  {
    variants: {
      variant: {
        play: 'py-2 px-4 bg-white text-base md:text-lg text-black hover:bg-white/80',
        playSmall:
          'py-2 px-4 bg-white text-base md:text-lg text-black hover:bg-white/80',
        info: 'py-2 px-4 bg-[#c0c0c070] text-base md:text-lg hover:bg-[#c0c0c0a7]',
        google: 'px-3 py-2 bg-white text-black gap-2',
        kakao: 'px-3 py-2 bg-[#FEE500] text-black gap-2',
        primary: 'px-3 py-2 bg-red-primary hover:bg-red-hover',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);
