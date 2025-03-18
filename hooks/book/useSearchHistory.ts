import { useLocalStorage } from '../useLocalStorage';

const LIMIT = 8;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('searchHistory', []);
  const add = (search: string) => {
    const newSearchHistory = Array.from(new Set([search, ...searchHistory])).slice(0, LIMIT);
    setSearchHistory(newSearchHistory);
  };
  const remove = (index: number) => {
    const newSearchHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newSearchHistory);
  };
  return { searchHistory, addHistory: add, removeHistory: remove };
};
