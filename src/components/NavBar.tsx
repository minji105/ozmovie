import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import useScroll from '@/hooks/useScroll';
import useDebounce from '@/hooks/useDebounce';
import { useAuth } from '@/contexts/AuthContext';
import UserIcon from '@/components/UserIcon';

export default function NavBar() {
  const isScrolled = useScroll();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputDebounce, setInputDebounce] = useState<string>('');
  const debouncedValue = useDebounce(inputDebounce);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search?keyword=${debouncedValue}`);
      console.log('keyword: ', debouncedValue);
    } else navigate('/');
  }, [debouncedValue]);

  return (
    <div
      className={`fixed z-[100] flex w-full items-center justify-between px-[5vw] py-4 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
    >
      <Link to="/">
        <h1 className="text-xl font-black text-red-primary md:hidden">OZ</h1>
        <h1 className="hidden text-2xl font-black text-red-primary md:block">
          OZMOVIE
        </h1>
      </Link>

      <div className="flex items-center gap-[2vw]">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            className={`transition-width border-b-2 bg-transparent text-white outline-none transition-[width] duration-300 ${isInputVisible || location.pathname === '/search' ? 'w-[calc(150px+5vw)]' : 'w-0'}`}
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
          <UserIcon />
        ) : (
          <Link to="/login">
            <button className="mr-2">로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
}
