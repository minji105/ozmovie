import { useNavigate } from 'react-router-dom';
import supabase from '@/supabaseClient';

export default function useLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('[로그아웃 실패]:', error.message);
        return false;
      }

      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error('로그아웃 중 에러:', err);
    }
  };

  return handleLogout;
}
