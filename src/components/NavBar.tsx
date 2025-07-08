import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import useScroll from '@/hooks/useScroll';
import { useAuth } from '@/contexts/AuthContext';
import UserIcon from '@/components/UserIcon';

interface NavBarProps {
  inputDebounce: string;
  setInputDebounce: (value: string) => void;
}

export default function NavBar({ inputDebounce, setInputDebounce }: NavBarProps) {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const isScrolled = useScroll();

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  return (
    <div
      className={`responsive-spacing fixed z-[100] flex w-full items-center justify-between py-4 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
    >
      <Link to="/" onClick={() => setInputDebounce('')}>
        <h1 className="text-xl font-black text-red-primary md:hidden">OZ</h1>
        <h1 className="hidden text-2xl font-black text-red-primary md:block">
          OZMOVIE
        </h1>
      </Link>

      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputDebounce}
            className={`transition-width border-b-2 bg-transparent text-white outline-none transition-[width] duration-300 ${isInputVisible || location.pathname === '/search' ? 'w-[200px]' : 'w-0'}`}
            onBlur={() => setIsInputVisible(false)}
            onChange={e => setInputDebounce(e.target.value)}
          />
          <button
            onClick={() => setIsInputVisible(!isInputVisible)}
            className={`text-xl text-white ${isInputVisible ? 'hidden' : ''}`}
          >
            <IoSearchSharp className="text-2xl" />
          </button>
        </div>

        {user ? (
          <UserIcon setInputDebounce={setInputDebounce} />
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
}
