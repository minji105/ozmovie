import { useCallback } from 'react';
import type { Provider } from '@supabase/supabase-js';
import supabase from '@/supabaseClient';

export default function useOAuthLogin() {
  const handleOAuthLogin = useCallback(async (provider: Provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
    } catch (error: any) {
      alert(`[${provider} 로그인 실패]: ${error?.message || error}`);
      console.error(error);
    }
  }, []);

  return handleOAuthLogin;
}
