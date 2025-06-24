import { buttonVariants } from '@/lib/buttonVariants';
import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'play' | 'info' | 'google' | 'kakao' | 'primary';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
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
