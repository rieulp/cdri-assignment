'use client';

import { BookListItem } from './bookListItem';
import { tw } from '@/utils';
import { Book } from '@/hooks/book/useSearchBooks';
import { useLikedBooks } from '@/hooks/book/useLikedBooks';

type Props = {
  books: Book[];
  className?: string;
};

export default function BookList({ books, className }: Props) {
  const { likedBooks, toggleLike } = useLikedBooks();

  return (
    <ol className={tw('max-w-[96rem] flex flex-col', className)}>
      {books.map((book, index) => {
        const isLiked = likedBooks.some((likedBook) => likedBook.isbn === book.isbn && likedBook.title === book.title);
        return (
          <BookListItem
            key={`${book.isbn}_${index}`}
            book={book}
            isLiked={isLiked}
            onToggleLike={() => toggleLike(book)}
          />
        );
      })}
    </ol>
  );
}
