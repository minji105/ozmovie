import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScroll from '@/hooks/useScroll';

export default function NavBar() {
  const isScrolled = useScroll();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  return (
    <div
      className={`fixed z-[100] flex w-full items-center justify-between px-[5vw] py-4 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
    >
      <Link to="/">
        <h1 className="text-red-primary text-xl font-black md:hidden">OZ</h1>
        <h1 className="text-red-primary hidden text-2xl font-black md:block">
          OZMOVIE
        </h1>
      </Link>

      <div className="flex items-center gap-[2vw]">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            className={`transition-width border-b-2 bg-transparent text-white outline-none transition-[width] duration-300 ${isInputVisible ? 'w-[calc(150px+5vw)]' : 'w-0'}`}
            onBlur={() => setIsInputVisible(false)}
          />
          <button
            onClick={() => setIsInputVisible(!isInputVisible)}
            className={`text-xl text-white ${isInputVisible ? 'hidden' : ''}`}
          >
            검색
          </button>
        </div>

        <Link to="/login">
          <button className="mr-2">로그인</button>
        </Link>
      </div>
    </div>
  );
}
