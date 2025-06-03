import { Category } from '@commercetools/platform-sdk';
import { Box, Checkbox } from '@mantine/core';
import { apiStore } from '@shared/api/store/api-store';
import { useSearchParams } from 'react-router-dom';

interface Props {
  category: Category;
}

export const CategoryFilter = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = category.key;
  const id = category.id;
  const isChecked = key !== undefined && searchParams.getAll('subcategory').includes(key);

  const handleToggle = async () => {
    if (!key || !id || !apiStore.api) {
      return;
    }

    const url = new URLSearchParams(searchParams);

    if (isChecked) {
      const remaining = url.getAll('subcategory').filter((value) => value !== key);
      url.delete('subcategory');
      remaining.forEach((el) => url.append('subcategory', el));
    } else {
      url.append('subcategory', key);
    }

    setSearchParams(url);
  };

  return (
    <Box maw={400} mx={30}>
      <Checkbox checked={isChecked} onChange={handleToggle} label={category.name?.en ?? 'Без названия'} />
    </Box>
  );
};
