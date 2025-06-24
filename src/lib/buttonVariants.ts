import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-300',
  {
    variants: {
      variant: {
        play: 'py-[1.3vw] px-[2.6vw] rounded-lg bg-white text-[calc(1vw+6px)] text-black hover:text-white hover:bg-blue-600',
        info: 'py-[1.3vw] px-[2.6vw] rounded-lg bg-[#c0c0c070] text-[calc(1vw+6px)] hover:bg-[#c0c0c0a7]',
        google: 'px-3 py-2 rounded-md bg-white text-black',
        kakao: 'px-3 py-2 rounded-md bg-[#FEE500] text-black',
        primary:
          'px-3 py-2 rounded-md bg-red-primary hover:bg-red-hover text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);
