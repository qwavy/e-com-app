import { Group, Select, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('q') ?? '';
  const [value, setValue] = useState(initial);
  const [debounced] = useDebouncedValue(value, 500);
  const sort = searchParams.get('sort') ?? '';

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debounced) {
        next.set('q', debounced);
        if (!next.get('sort')) {
          next.set('sort', 'name.en asc');
        }
      } else {
        next.delete('q');
        if (next.get('sort')?.startsWith('name.en')) {
          next.delete('sort');
        }
      }
      next.delete('page');
      return next;
    });
  }, [debounced, setSearchParams]);

  const handleSortChange = (value: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set('sort', value);
      } else {
        next.delete('sort');
      }
      next.delete('page');
      return next;
    });
  };

  return (
    <Group grow mb="md">
      <Select
        value={sort}
        onChange={handleSortChange}
        data={[
          { value: 'name-asc', label: 'Название (A-Z)' },
          { value: 'name-desc', label: 'Название (Z-A)' },
        ]}
        placeholder="Сортировка"
        clearable
      />
      <TextInput
        placeholder="Search products…"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        w="97%"
      />
    </Group>
  );
};
