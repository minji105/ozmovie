# OZMOVIE
>배포 링크: https://ozmovie.vercel.app/ <BR>
제작 기간: 2025.06.24 ~ 07.15 (리팩토링 진행 중)

### Test id & pw
| id| pw|
| :--- | :--- | 
| test@test.com | Test1234 |

---

## 🛠️ Stacks
**Environment** <BR>
![](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
<BR>
**Package & Build Tools** <BR>
![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
<BR>
**Code Quality**<BR>
![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
<BR>
**Development** <BR>
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
<BR>
**Deployment**  <BR>
![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📺 화면 구성 및 기능
### 메인 페이지
![화면 녹화 중 2025-07-17 144254 (1)](https://github.com/user-attachments/assets/376c35f5-06ee-452e-81b1-7dfa154ab2b0)

* 일간 트렌딩 콘텐츠를 일정 간격마다 자동 순환하며, 페이드 인/아웃 애니메이션 효과를 적용합니다.
* 여러 카테고리의 콘텐츠를 슬라이더 형태로 보여줍니다.
* 배너의 '상세 정보' 버튼이나 콘텐츠를 클릭하면 상세 모달을 띄웁니다.

### 검색 페이지
![화면 녹화 중 2025-07-17 145247](https://github.com/user-attachments/assets/92e3c8e0-b1ba-4dee-9e3b-7b57698045f2)

* 검색 결과 개수를 함께 보여줍니다.
* 스크롤을 내리면 추가 검색 결과를 자동으로 로딩합니다. (무한 스크롤)
* 검색 결과의 콘텐츠를 클릭하면 상세 모달을 띄웁니다.

### 상세 페이지
![화면 녹화 중 2025-07-17 150744](https://github.com/user-attachments/assets/250cdaa2-ff65-43c4-be15-a47d11d39f23)

* 콘텐츠의 정보(제목, 개봉 연도, 시즌 정보(TV), 상영 시간(영화), 장르, 태그라인, 줄거리 등)를 보여줍니다.
* 찜하기 버튼을 눌러 콘텐츠를 찜 목록에 추가/제거할 수 있습니다.
* 좋아요 버튼을 눌러 콘텐츠에 '좋아요'를 표시하거나 취소할 수 있습니다.
* TV 프로그램의 경우 각 시즌의 정보를 함께 보여줍니다.
* 현재 콘텐츠와 비슷한 콘텐츠 목록을 보여주며 클릭 시 해당 콘텐츠의 상세 모달로 이동합니다.

### 로그인/회원가입 페이지
![화면 녹화 중 2025-07-17 151730](https://github.com/user-attachments/assets/906f1f93-d8e8-4e48-a8a4-5f5d4e69a6e7)

![화면 녹화 중 2025-07-17 154554](https://github.com/user-attachments/assets/8d44d7f9-1c20-45f5-afb3-ce9b35791cb8)

* 입력값에 대한 실시간 유효성 검사를 수행합니다.
* 구글 및 카카오 계정으로 로그인할 수 있습니다.

### 마이 페이지
![화면 녹화 중 2025-07-17 155323](https://github.com/user-attachments/assets/01a221d0-ddef-4dce-a945-a4c357299add)

* 사용자의 프로필 이미지와 이름을 표시하며, 프로필 이미지가 없는 경우 기본 이미지를 표시합니다.
* 사용자가 찜한 콘텐츠 목록과 좋아요를 누른 콘텐츠 목록을 슬라이더 형태로 보여줍니다.
* 콘텐츠를 클릭하면 상세 모달을 띄웁니다.

---

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

---

## 📁 디렉토리 구조
```
├── public/               # 정적 에셋 (이미지, 폰트)
├── src/                  
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── common/           # 범용 컴포넌트
│   ├── detailModal/      # 상세 정보 모달 관련 컴포넌트
│   ├── skeletons/        # 로딩 상태 UI 스켈레톤
│   └── slider/           # 슬라이더 관련 컴포넌트
│   ├── constants/        # 상수 
│   ├── contexts/         # React Context 
│   ├── hooks/            # 커스텀 React Hooks
│   └── auth/             # 인증 관련 Hooks
│   ├── lib/              # 라이브러리 헬퍼, 유효성 검사 스키마
│   ├── pages/            # 라우팅되는 페이지 컴포넌트
│   ├── utils/            # 유틸리티 함수
│   ├── App.tsx           
│   ├── main.tsx          
│   ├── supabaseClient.ts # Supabase 클라이언트 설정
│   └── types.ts          # 전역 TypeScript 타입 정의
├── .eslintrc.json        # ESLint 설정
├── package.json          
├── tailwind.config.js    # Tailwind CSS 설정
├── tsconfig.json         # TypeScript 설정
└── vite.config.ts        # Vite 설정
```

---

### 📝 개발 블로그
[스크롤 이벤트에 throttle 적용시키기](https://velog.io/@minji105/React-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%97%90-throttle-%EC%A0%81%EC%9A%A9%EC%8B%9C%ED%82%A4%EA%B8%B0)
