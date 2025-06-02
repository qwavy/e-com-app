import { Category } from '@commercetools/platform-sdk';
import { Box, Checkbox } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

interface Props {
  category: Category;
}

export const CategoryFilter = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isChecked = searchParams.getAll('subcategory').includes(category.key);

  const handleToggle = () => {
    const url = new URLSearchParams(searchParams);

    if (isChecked) {
      const remaining = url.getAll('subcategory').filter((value) => value !== category.key);

      url.delete('subcategory');
      remaining.forEach((el) => url.append('subcategory', el));
    } else {
      url.append('subcategory', category.key);
    }

    setSearchParams(url);
  };

  return (
    <Box maw={400} mx={30}>
      <Checkbox checked={isChecked} onChange={handleToggle} label={category.name.en} />
    </Box>
  );
};
