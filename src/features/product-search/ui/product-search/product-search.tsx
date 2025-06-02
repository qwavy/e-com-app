import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('q') ?? '';
  const [value, setValue] = useState(initial);

  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debounced) {
        next.set('q', debounced);
      } else {
        next.delete('q');
      }
      next.delete('page');
      return next;
    });
  }, [debounced, setSearchParams]);

  return (
    <TextInput placeholder="Search products…" value={value} onChange={(e) => setValue(e.currentTarget.value)} w="97%" />
  );
};
