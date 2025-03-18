'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBooksQuery, useInfiniteSearchBooks } from '@/hooks/book';
import NoData from '@/components/common/empty/noData';
import CountText from '@/components/common/countText';
import SearchBox from './searchBox';
import BookList from './bookList';

export default function SearchBooksSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = {
    searchType: (searchParams.get('searchType') ?? 'all') as SearchBooksQuery['searchType'],
    query: searchParams.get('query') ?? '',
    target: (searchParams.get('target') as SearchBooksQuery['target']) ?? undefined,
    targetQuery: searchParams.get('targetQuery') ?? '',
  };

  const setSearchQuery = (query: SearchBooksQuery) => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) urlSearchParams.set(key, value);
    });

    router.replace(`?${urlSearchParams.toString()}`);
  };

  const { books, fetchNextPage, hasNextPage, meta } = useInfiniteSearchBooks(searchQuery);

  const bottomRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
        },
        { threshold: 0.1, rootMargin: '400px' },
      );
      observer.observe(node);

      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage],
  );

  return (
    <section className="py-[8rem] px-[2rem] flex gap-[2.4rem] flex-col flex-1">
      <SearchBox searchBooksQuery={searchQuery} onSearch={setSearchQuery} />
      <div className="flex gap-[3.6rem] flex-col flex-1">
        <CountText label="도서 검색 결과" count={meta?.total_count ?? 0} />
        {books.length ? (
          <BookList books={books} />
        ) : (
          <NoData icon="book" label="검색된 결과가 없습니다." className="pt-[12rem] flex-1" />
        )}
      </div>
      <div ref={bottomRefCallback}></div>
    </section>
  );
}
