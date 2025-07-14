import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  hideLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      error,
      hideLabel = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        {!hideLabel && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-md bg-[#96969644] px-8 py-4 text-base text-white outline-none ${error ? 'border border-red-700' : ''}`}
          {...rest}
        />
        {error && <p className="mt-[-8px] text-sm text-red-500">{error}</p>}
      </>
    );
  },
);

export default Input;
