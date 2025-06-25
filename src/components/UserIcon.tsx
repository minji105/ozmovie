import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function UserIcon() {
  const { user } = useAuth();
  const userIcon = user?.user_metadata.avatar_url;

  return userIcon ? (
    <div className="w-[30px] cursor-pointer overflow-hidden rounded-full">
      <img src={userIcon} alt="user icon" />
    </div>
  ) : (
    <FaUserCircle className="cursor-pointer text-3xl" />
  );
}
