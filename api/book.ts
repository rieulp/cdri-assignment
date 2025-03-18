const BASE_URL = 'https://dapi.kakao.com/v3/search';
const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

export type SearchTarget = 'title' | 'person' | 'publisher';
export type FetchBooksRequestParams = {
  /** 검색을 원하는 질의어 */
  query: string;
  /** 결과 문서 정렬방식. accuracy(기본값): 정확도, latest: 최신순 */
  sort?: 'accuracy' | 'latest';
  /** 페이지 번호 기본값 1, [1, 50] */
  page?: number;
  /** 한 페이지에 보여질 문서 수. 기본값 10, [1, 50] */
  size?: number;
  /** 검색 필드 제한 */
  target?: SearchTarget;
};

type Meta = {
  /** 검색된 문서 수 */
  total_count: number;
  /** 중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수 */
  pageable_count: number;
  /** 현재 페이지가 마지막 페이지인지 여부 */
  is_end: boolean;
};

export type Document = {
  /** 도서 제목 */
  title: string;
  /** 도서 소개 */
  contents: string;
  /** 도서 상세 URL */
  url: string;
  /** ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호. 두 값이 모두 제공될 경우 공백(' ')으로 구분 */
  isbn: string;
  /* 도서 출판날짜, ISO 8601 형식. [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz] */
  datetime: string;
  /** 도서 저자 리스트 */
  authors: string[];
  /** 도서 출판사 */
  publisher: string;
  /** 도서 번역자 리스트 */
  translators: string[];
  /** 도서 정가 */
  price: number;
  /** 도서 판매가 */
  sale_price: number;
  /** 도서 표지 미리보기 URL */
  thumbnail: string;
  /** 도서 판매 상태 정보 (정상, 품절, 절판 등) */
  status: string;
};

export type FetchBooksResponse = {
  meta: Meta;
  documents: Document[];
};

export const fetchBooks = async ({
  query,
  target,
  page = 1,
  size = 10,
}: FetchBooksRequestParams): Promise<FetchBooksResponse> => {
  if (!query?.trim())
    return {
      meta: {
        total_count: 0,
        pageable_count: 0,
        is_end: true,
      },
      documents: [],
    };

  const url = new URL(`${BASE_URL}/book`);
  url.searchParams.append('query', query.trim());
  if (target) url.searchParams.append('target', target);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books', { cause: response.statusText });
  }

  return (await response.json()) as FetchBooksResponse;
};
