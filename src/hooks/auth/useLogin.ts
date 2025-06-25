import supabase from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';
import type { LoginSchemaType } from '@/lib/validationSchemas';

export default function useLogin() {
  const navigate = useNavigate();

  const handleLogin = async (data: LoginSchemaType) => {
    const { email, password } = data;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('[로그인 실패] ' + error.message);
      } else {
        console.log('login success: ', data);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return handleLogin;
}
