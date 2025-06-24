export const BASE_URL: string = 'https://image.tmdb.org/t/p/w500';
export const BASE_URL_ORIGIN: string = 'https://image.tmdb.org/t/p/original';
export const API_KEY: string = import.meta.env.VITE_API_KEY;

export const SUPABASE_URL: string = import.meta.env.VITE_PROJECT_URL;
export const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_API_KEY;

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 사용
export const REGEX_NAME = /^[가-힣a-zA-Z0-9]{2,8}$/; // 2~8자 사이 숫자, 한글, 영어만 사용
export const REGEX_PW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // 영어 대문자/소문자 + 숫자, 6자 이상
