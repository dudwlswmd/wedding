import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // 로컬 스토리지에서 값을 가져오거나 초기값 사용
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 로컬 스토리지에 값을 저장하는 함수
  const setValue = (value) => {
    try {
      // 함수를 받은 경우 이전 값으로 호출
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage; 