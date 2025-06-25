import { useNavigate } from 'react-router-dom';
import supabase from '@/supabaseClient';
import type { RegisterSchemaType } from '@/lib/validationSchemas';

export default function useRegister() {
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterSchemaType) => {
    const { email, name, password } = data;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        alert('[회원가입 실패] ' + error.message);
        return false;
      }

      alert('회원가입 완료');
      console.log('register success:', data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 중 에러:', error);
    }
  };

  return handleRegister;
}
