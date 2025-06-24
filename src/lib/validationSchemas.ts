import { z } from 'zod';

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해주세요.')
    .email('유효하지 않은 이메일 주소입니다.'),
  password: z
    .string()
    .nonempty('비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 6자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      '영문 대문자, 소문자, 숫자 조합 6자리 이상을 입력해주세요.',
    ),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty('이메일을 입력해주세요.')
      .email('유효하지 않은 이메일 주소입니다.'),
    name: z
      .string()
      .nonempty('이름을 입력해주세요.')
      .regex(
        /^[가-힣a-zA-Z0-9]{2,8}$/,
        '숫자, 한글, 영어 조합 2~8자를 입력해주세요.',
      ),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .min(6, '비밀번호는 6자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        '영문 대문자, 소문자, 숫자 조합 6자리 이상을 입력해주세요.',
      ),
    passwordCheck: z.string().nonempty('비밀번호를 다시 입력해주세요.'),
  })
  .refine(data => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });
