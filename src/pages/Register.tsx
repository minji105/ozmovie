import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validationSchemas';
import type { RegisterSchemaType } from '@/lib/validationSchemas';
import useRegister from '@/hooks/auth/useRegister';
import useOAuthLogin from '@/hooks/auth/useOAuthLogin';
import REGISTER_FIELDS from '@/constants/registerFields';
import AuthLayout from '@/components/AuthLayout';
import Input from '@/components/Input';
import Button from '@/components/common/Button';
import { GoogleIcon, KakaoIcon } from '@/components/Icons';

export default function Register() {
  const handleRegister = useRegister();
  const handleOAuthLogin = useOAuthLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="relative mx-auto mb-20 mt-14 flex w-full min-w-[340px] flex-col gap-4 rounded-2xl bg-black p-[5vw] sm:mt-24 sm:w-[500px] sm:bg-[#000000c1] sm:p-14"
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-center">회원가입</h2>

        {REGISTER_FIELDS.map(field => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            hideLabel={field.hideLabel}
            error={errors[field.id as keyof RegisterSchemaType]?.message}
            {...register(field.id as keyof RegisterSchemaType)}
          />
        ))}

        <button
          type="submit"
          className="w-full rounded-md bg-red-primary px-6 py-2 text-lg text-white hover:bg-red-hover"
        >
          가입하기
        </button>

        <p className="my-2 text-center text-sm text-gray-300">OR</p>

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
      </form>
    </AuthLayout>
  );
}
