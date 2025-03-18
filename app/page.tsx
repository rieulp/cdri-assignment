import React from 'react';
import DefaultLayout from '@/components/layout/defaultLayout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SearchBooksSection from '@/components/book/searchBooksSection';
import { getBooks, SearchBooksQuery } from '@/hooks/book/useSearchBooks';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = (await searchParams) as unknown as SearchBooksQuery;

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['books', params],
    queryFn: ({ pageParam = 1 }) => getBooks({ ...params, page: pageParam }),
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getBooks>>,
      allPages: Awaited<ReturnType<typeof getBooks>>[],
    ) => {
      return lastPage?.meta.is_end ? undefined : allPages?.length + 1;
    },
    initialPageParam: 1,
  });

  return (
    <DefaultLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchBooksSection />
      </HydrationBoundary>
    </DefaultLayout>
  );
}
