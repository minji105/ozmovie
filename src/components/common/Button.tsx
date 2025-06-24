import { buttonVariants } from '@/lib/buttonVariants';
import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'play' | 'info';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'play',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
}
