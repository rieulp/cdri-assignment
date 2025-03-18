import { Document, fetchBooks as fetchBooks, SearchTarget } from '@/api/books';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export type SearchBooksQuery = {
  searchType: 'all' | 'target';
  query?: string;
  targetQuery?: string;
  target?: SearchTarget;
};

export type SearchBooksParams = { page?: number } & SearchBooksQuery;
export type Book = Pick<
  Document,
  'title' | 'authors' | 'price' | 'sale_price' | 'thumbnail' | 'contents' | 'url' | 'isbn'
>;

const SIZE = 10;

const convertDocumentToBook = (document: Document): Book => ({
  title: document.title,
  authors: document.authors,
  price: document.price,
  sale_price: document.sale_price,
  thumbnail: document.thumbnail,
  contents: document.contents,
  url: document.url,
  isbn: document.isbn.split(' ')[0],
});

export const getBooks = async (params: SearchBooksParams) => {
  const { searchType, query = '', targetQuery = '', target, page = 1 } = params;
  if (searchType === 'all') return fetchBooks({ query, page, size: SIZE, target });
  else return fetchBooks({ query: targetQuery, page, size: SIZE, target });
};

export const useSearchBooks = (params: SearchBooksQuery) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['books', params],
    queryFn: ({ pageParam = 1 }) => getBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.meta.is_end ? undefined : allPages?.length + 1;
    },
    initialPageParam: 1,
  });

  const books = useMemo(() => data?.pages.flatMap((page) => page.documents).map(convertDocumentToBook) ?? [], [data]);
  const meta = data?.pages[0]?.meta;

  return { books, meta, fetchNextPage, hasNextPage };
};
