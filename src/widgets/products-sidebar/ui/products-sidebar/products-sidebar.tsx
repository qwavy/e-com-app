import { apiStore } from '@shared/api/store/api-store';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { CategoryFilter } from '../category-filter/category-filter';
import style from './products-sidebar.module.css';

export const ProductsSidebar = observer(() => {
  const fetchCategories = async () => {
    if (!apiStore.api) {
      throw new Error('API is not initialized');
    }
    const response = await apiStore.api.api.categories().get().execute();
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products-categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div className={style.sidebar}>Загрузка...</div>;
  }

  if (isError) {
    return <div className={style.sidebar}>Ошибка загрузки категорий: {(error as Error).message}</div>;
  }

  return (
    <div className={style['sidebar']}>
      {data?.body.results.map((category) => (
        <React.Fragment key={category.key}>
          <CategoryFilter category={category} />
        </React.Fragment>
      ))}
    </div>
  );
});
