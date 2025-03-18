# Frontend 박라영 - CDRI

도서 검색 API를 활용하여 사용자가 책을 검색하고, 찜한 책을 관리할 수 있는 웹 애플리케이션입니다.

## 프로젝트 개요

- Kakao API를 이용한 도서 검색(전체, 상세 - 제목, 저자, 출판사)을 할 수 있습니다.
- 검색된 결과를 10개씩 로드해서 보여줍니다.(무한스크롤)
- 검색된 책을 찜할 수 있고, 내가찜한 책 페이지(/favorites) 에서 찜한 책 목록을 확인 수정할 수 있습니다.

## 실행 방법 및 환경설정

### 패키지 설치

```bash
npm install
```

### 환경 변수 설정

```env
NEXT_PUBLIC_KAKAO_REST_API_KEY=your-kakao-api-key
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 실행됩니다.

### 빌드 및 프리뷰

```bash
npm run build
npm run start
```

## 폴더 구조

```
project root
 ┣ api          # API 요청 관련 코드
 ┣ app          # Next.js의 페이지 및 레이아웃 관리
 ┃ ┣ favorites
 ┃ ┣ favicon.ico
 ┃ ┣ layout.tsx # root layout
 ┃ ┗ page.tsx   # 메인 페이지
 ┣ assets       # 정적 리소스 (아이콘)
 ┃ ┗ icons      # SVG 아이콘 파일
 ┣ components   # UI 컴포넌트
 ┃ ┣ layout     # 레이아웃 관련 컴포넌트
 ┃ ┣ common     # 공통 컴포넌트
 ┃ ┗ ...        # 기능별 컴포넌트
 ┣ context      # 전역 상태 관리 컨텍스트
 ┣ hooks        # 커스텀 훅
 ┃ ┣ common     # 공통 훅
 ┃ ┗ ...        # 기능별 훅
 ┣ public
 ┣ styles       # 스타일 관련 파일
 ┃ ┣ theme      # tailwind CSS 커스텀 스타일
 ┃ ┗ globals.css
 ┣ utils        # 공통 유틸리티
 ┃ ┣ tw.ts      # tailwind-merge 사용 유틸
 ┃ ┗ ...
 ┣ .env         # 환경변수
 ┗ ...          # 프로젝트 세팅, 깃, package 파일
```

### 폴더 구성 방식

- 각 타입별 디렉토리 구성 (API, 페이지, 컴포넌트, 스타일, 유틸 등으로 분리)
- 공통 기능은 common 디렉토리에 정리
- 특정 기능(도메인) 관련 파일은 해당 기능별 디렉토리 하위에 배치

## 주요 코드 설명

### 검색 상태 관리

```tsx
const searchParams = useSearchParams();
const router = useRouter();

const [searchQuery, setSearchQuery] = useState({
  searchType: searchParams.get('searchType') ?? 'all',
  query: searchParams.get('query') ?? '',
  target: searchParams.get('target') ?? undefined,
  targetQuery: searchParams.get('targetQuery') ?? '',
});
```

- `searchParams`를 통해 검색 조건을 URL과 동기화합니다.
- 검색 타입(`전체 검색`, `상세 검색`)과 검색어를 `searchQuery` 상태로 관리합니다.

### 전체 검색 및 상세 검색 상태 업데이트

검색어 입력 후 전체 검색과 상세 검색을 구분하여 실행합니다.

```tsx
const handleGlobalSearch = (value: string) => {
  setSearchQuery({ searchType: 'all', query: value.trim(), target: undefined, targetQuery: '' });
  handleSearch({ searchType: 'all', query: value.trim() });
};

const handleDetailSearch = () => {
  handleSearch({ searchType: 'target', target: searchQuery.target, query: searchQuery.targetQuery.trim() });
};
```

- `handleGlobalSearch`는 검색어 입력 후 전체 검색을 실행합니다.
- `handleDetailSearch`는 특정 필드(제목, 저자, 출판사 등)에서 검색을 실행합니다.
- `handleSearch`를 호출하여 `searchQuery` 상태를 업데이트하고 검색을 실행합니다.

### 검색 실행 및 URL 업데이트

검색 실행 시 URL을 업데이트하여 검색 결과를 유지합니다.

```tsx
const handleSearch = (query) => {
  const urlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) urlParams.set(key, value);
  });

  router.replace(`?${urlParams.toString()}`);
  setSearchQuery(query);
};
```

- `handleSearch` 함수는 검색어를 받아 URL과 상태를 업데이트합니다.
- 사용자가 새로고침하더라도 검색 조건이 유지됩니다.

### 검색 요청 및 데이터 로드

`searchQuery` 상태가 변경되고 useInfiniteQuery 를 사용한 `useSearchBooks` 훅으로 데이터를 가져옵니다.

```tsx
const { books, fetchNextPage, hasNextPage, meta } = useSearchBooks(searchQuery);
```

- `searchQuery`를 기반으로 API 요청을 보내고 데이터를 가져옵니다.
- `fetchNextPage`는 무한 스크롤을 통해 다음 페이지의 데이터를 추가로 가져옵니다.
