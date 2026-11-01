import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Funksiya berilgani uchun faqat birinchi chizishda bir marta ishlaydi
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // value o'zgargan zahoti xotiraga yozib qo'yadi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // xotira to'lgan yoki yopiq bo'lsa, ilova baribir ishlayveradi
    }
  }, [key, value]);

  return [value, setValue];
}