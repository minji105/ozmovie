import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validationSchemas';
import type { LoginSchemaType } from '@/lib/validationSchemas';
import LOGIN_FIELDS from '@/constants/loginFields';
import useOAuthLogin from '@/hooks/useOAuthLogin';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import Input from '@/components/Input';
import Button from '@/components/common/Button';
import { GoogleIcon, KakaoIcon } from '@/components/Icons';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = async (data: LoginSchemaType) => {
    const result = await signIn(data);
    if (result) navigate('/');
  };

  const handleOAuthLogin = useOAuthLogin();

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="relative mx-auto mb-20 mt-14 flex w-full min-w-[340px] flex-col gap-4 rounded-2xl bg-black p-[5vw] sm:mt-24 sm:w-[500px] sm:bg-[#000000c1] sm:p-14"
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-center">로그인</h2>

        {LOGIN_FIELDS.map(field => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            hideLabel={field.hideLabel}
            error={errors[field.id as keyof LoginSchemaType]?.message}
            {...register(field.id as keyof LoginSchemaType)}
          />
        ))}

        <button
          type="submit"
          className="w-full rounded-md bg-red-primary px-6 py-2 text-lg text-white hover:bg-red-hover"
        >
          로그인
        </button>

        <Button
          type="button"
          variant="google"
          onClick={() => handleOAuthLogin('google')}
        >
          <GoogleIcon />
          <p>Continue with Google</p>
        </Button>

        <Button
          type="button"
          variant="kakao"
          onClick={() => handleOAuthLogin('kakao')}
        >
          <KakaoIcon />
          <p>Continue with Kakao</p>
        </Button>

        <div className="text-base">
          <span className="text-gray-300">
            오즈무비 회원이 아닌가요? &nbsp;
          </span>
          <Link to="/register">
            <span className="hover:underline">지금 가입하세요.</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
