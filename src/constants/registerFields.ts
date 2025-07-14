const REGISTER_FIELDS = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일 주소',
  },
  {
    id: 'name',
    label: '이름',
    type: 'text',
    placeholder: '2~8자, 숫자, 한글, 영어만 사용',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '6자 이상, 영문 대/소문자 + 숫자',
  },
  {
    id: 'passwordCheck',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호 확인',
    hideLabel: true,
  },
];

export default REGISTER_FIELDS;
