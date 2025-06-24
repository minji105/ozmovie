import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import supabase from '../supabaseClient';
import { registerSchema } from '@/lib/validationSchemas';
import type { RegisterSchemaType } from '@/lib/validationSchemas';
import REGISTER_FIELDS from '@/constants/registerFields';
import AuthLayout from '@/components/AuthLayout';
import Input from '@/components/Input';

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

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
      console.log('register success: ', data);

      if (error) {
        alert('[회원가입 실패] ' + error.message);
      } else {
        alert('회원가입 완료');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log('회원가입 시도 값:', data.email, data.name, data.password);
    }
  };

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
          className="bg-red-primary hover:bg-red-hover w-full rounded-md px-6 py-2 text-lg text-white"
        >
          가입하기
        </button>
      </form>
    </AuthLayout>
  );
}
