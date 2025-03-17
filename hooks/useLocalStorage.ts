import { useEffect, useState } from 'react';

const getLocalStorageValue = <T>(key: string, initialValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => getLocalStorageValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`${key} 데이터 저장 실패:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
