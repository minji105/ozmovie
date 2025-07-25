import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import useLogout from '@/hooks/auth/useLogout';

interface UserIconProps {
  setInputDebounce: (value: string) => void;
}

export default function UserIcon({ setInputDebounce }: UserIconProps) {
  const { user } = useAuth();
  const userIcon = user?.user_metadata.avatar_url;

  const handleLogout = useLogout();

  return (
    <div className="group relative">
      {userIcon ? (
        <div className="w-[30px] cursor-pointer overflow-hidden rounded-full">
          <img src={userIcon} alt="user icon" />
        </div>
      ) : (
        <FaUserCircle className="cursor-pointer text-3xl" />
      )}

      <div className="absolute right-0 top-0 hidden w-max group-hover:block">
        <ul className="mt-10 flex flex-col gap-4 bg-[#000000c1] p-4 text-sm">
          <li className="hover:underline">
            <Link to="/mypage" onClick={() => setInputDebounce('')}>
              마이페이지
            </Link>
          </li>
          <li className="hover:underline">
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
