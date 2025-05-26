import { ProductCard } from '@entities/product';
import { Pagination, Skeleton } from '@mantine/core';
import { api } from '@shared/api/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import style from './products-list.module.css';

export const ProductsList = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 10;
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: () =>
      api?.api
        .products()
        .get({ queryArgs: { limit: productsPerPage, offset: (page - 1) * productsPerPage, priceCurrency: 'USD' } })
        .execute(),
  });

  if (error) {
    return 'An error has occurred: ' + error.message;
  }

  return (
    <Skeleton visible={isPending}>
      <div className={style['products-list']}>
        {products?.body.results.map((product) => (
          <div key={product.id}>
            <ProductCard id={product.id} />
          </div>
        ))}
      </div>
      <Pagination total={Math.ceil(products?.body.total / productsPerPage)} mt={20} onChange={setPage} value={page} />
    </Skeleton>
  );
};
