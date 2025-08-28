import { useEffect, useState } from 'react';

export const useHighlightOnChange = <T>(value: T) => {
  const [highlight, setHighlight] = useState<boolean>(false);

  const duration = 1000;

  useEffect(() => {
    setHighlight(true);

    const timer = setTimeout(() => {
      setHighlight(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [value]);

  return highlight;
};
