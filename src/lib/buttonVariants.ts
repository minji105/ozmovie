import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'py-[1.3vw] px-[2.6vw] rounded-lg text-[calc(1vw+6px)] transition-all duration-[3000]',
  {
    variants: {
      variant: {
        play: 'bg-white text-black hover:text-white hover:bg-blue-600',
        info: 'bg-[#c0c0c070] hover:bg-[#c0c0c0a7]',
      },
    },
    defaultVariants: {
      variant: 'play',
    },
  },
);
