# OZMOVIE
>배포 링크: https://ozmovie.vercel.app/ <BR>
제작 기간: 2025.06.24 ~ 07.15 (리팩토링 진행 중)

### Test id & pw
| id| pw|
| :--- | :--- | 
| test@test.com | Test1234 |

## 🛠️ Stacks

**Environment** <BR>
![](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

**Package & Build Tools** <BR>
![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

**Code Quality**<BR>
![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

**Development** <BR>
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

**Deployment**  <BR>
![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📡 사용 API 목록 (TMDB)

| 기능 | Method | Endpoint |
| :-- | :--: | :-- |
| 인기 영화 가져오기 | GET | `/movie/popular` |
| 7일 이내 방영 예정 TV 시리즈 | GET | `/tv/on_the_air` |
| 조건 기반 영화 검색 | GET | `/discover/movie` |
| 영화, TV, 인물 검색 | GET | `/search/multi?query={keyword}` |
| 일간 트렌딩 콘텐츠 | GET | `/trending/all/day` |
| 특정 TV 시즌 상세 | GET | `/tv/{series_id}/season/{season_number}` |
| TV 시리즈 추천 목록 | GET | `/tv/{series_id}/recommendations` |
| 영화 추천 목록 | GET | `/movie/{movie_id}/recommendations` |

---

## 🖼️ 이미지 기본 경로

| 용도 | URL |
|------|-----|
| 포스터 등 (작은 이미지) | `https://image.tmdb.org/t/p/w500` |
| 백드롭 등 (원본 해상도) | `https://image.tmdb.org/t/p/original` |

> 사용 예시 (TypeScript):
```ts
export const BASE_URL: string = 'https://image.tmdb.org/t/p/w500';
export const BASE_URL_ORIGIN: string = 'https://image.tmdb.org/t/p/original';
 ```
