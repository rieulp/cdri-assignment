import { useLocalStorage } from '../useLocalStorage';
import { Book } from './useSearchBooks';

export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useLocalStorage<Book[]>('likedBooks', []);

  const toggleLike = (book: Book) => {
    const index = likedBooks.findIndex((likedBook) => likedBook.isbn === book.isbn && likedBook.title === book.title);
    if (index >= 0) {
      setLikedBooks(likedBooks.filter((_, i) => i !== index));
    } else setLikedBooks([...likedBooks, book]);
  };

  return { likedBooks, toggleLike };
};
