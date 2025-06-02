import { api } from '@shared/api/api';
import { useQuery } from '@tanstack/react-query';

import { CategoryFilter } from '../category-filter/category-filter';
import style from './products-sidebar.module.css';

export const ProductsSidebar = () => {
  const { data } = useQuery({
    queryKey: ['products-categories'],
    queryFn: () => api?.api.categories().get().execute(),
  });

  return (
    <div className={style['sidebar']}>
      {data?.body.results.map((category) => (
        <>
          <CategoryFilter key={category.key} category={category} />
        </>
      ))}
    </div>
  );
};
