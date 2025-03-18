'use client';

import BookList from '@/components/book/bookList';
import CountText from '@/components/common/countText';
import NoData from '@/components/common/empty/noData';
import { useLikedBooks } from '@/hooks/book/useLikedBooks';

export default function Favorite() {
  const { likedBooks } = useLikedBooks();
  return (
    <section className="py-[8rem] px-[2rem] flex gap-[1.2rem] flex-col flex-1">
      <h2 className="text-text-primary text-title2">내가 찜한 책</h2>
      <CountText label="찜한 책" count={likedBooks.length} />
      {likedBooks.length ? (
        <BookList books={likedBooks} />
      ) : (
        <NoData icon="book" label="찜한 책이 없습니다." className="pt-[12rem] flex-1" />
      )}
    </section>
  );
}
