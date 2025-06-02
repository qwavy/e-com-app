import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { ProductCard } from '@entities/product';
import { Pagination, Skeleton } from '@mantine/core';
import { apiStore } from '@shared/api/store/api-store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import style from './products-list.module.css';

export const ProductsList = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  const {
    isPending,
    error,
    data: products,
  } = useQuery<ProductPagedQueryResponse>({
    queryKey: ['products', page, apiStore.api?.accessToken],
    queryFn: async () => {
      if (!apiStore.api) {
        throw new Error('API not initialized');
      }
      const response = await apiStore.api.api
        .products()
        .get({ queryArgs: { limit: productsPerPage, offset: (page - 1) * productsPerPage } })
        .execute();
      return response.body;
    },
    enabled: !!apiStore.api,
  });

  if (error) {
    return 'An error has occurred: ' + error.message;
  }

  return (
    <Skeleton visible={isPending}>
      <div className={style['products-list']}>
        {Array.isArray(products?.results) &&
          products.results.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <h1>Total: {products?.total}</h1>
      <Pagination total={Math.ceil((products?.total ?? 0) / productsPerPage)} mt={20} onChange={setPage} value={page} />
    </Skeleton>
  );
};
