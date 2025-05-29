import { api } from '@shared/api/api';
import { useQuery } from '@tanstack/react-query';

import { CategoryFilter } from '../category-filter/category-filter';

export const ProductsSidebar = () => {
  const { data } = useQuery({
    queryKey: ['products-categories'],
    queryFn: () => api?.api.categories().get().execute(),
  });
  console.log(data?.body.results);
  return (
    <div>
      {data?.body.results.map((category) => (
        <>
          <CategoryFilter key={category.key} category={category} />
        </>
      ))}
    </div>
  );
};
