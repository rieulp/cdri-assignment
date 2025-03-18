import { useEffect, useState } from 'react';

const getLocalStorageValue = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    setStoredValue(getLocalStorageValue(key, initialValue));
  }, [key]);

  const updateStoredValue = (value: T) => {
    setStoredValue(value);
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`${key} 데이터 저장 실패:`, error);
    }
  };

  return [storedValue, updateStoredValue] as const;
};
