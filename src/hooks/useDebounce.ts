import { useState, useEffect } from "react";

export const useDebounce = (search: string, delay: number) => {
  const [debouncedValue, setDebounceValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search]);

  return debouncedValue;
};
