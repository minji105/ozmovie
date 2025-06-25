import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import useLogout from '@/hooks/auth/useLogout';

export default function UserIcon() {
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
        <div className="mt-10 bg-[#000000c1] p-4 text-sm">
          <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
