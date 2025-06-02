import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { ProductCard } from '@entities/product';

import { Loader, Pagination, Skeleton } from '@mantine/core';
import { api } from '@shared/api/api';

import { Pagination, Skeleton } from '@mantine/core';
import { apiStore } from '@shared/api/store/api-store';

import { useQuery } from '@tanstack/react-query';
import { getCategoriesByKeys } from '@widgets/products-list/model';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import style from './products-list.module.css';

export const ProductsList = () => {
  const [searchParams] = useSearchParams();

  const searchPhrase = (searchParams.get('q') ?? '').trim();

  const [subCategoriesIds, setSubCategoriesIds] = useState<string[]>([]);

  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchPhrase]);

  useEffect(() => {
    const fetchIds = async () => {
      const ids = await getCategoriesByKeys(searchParams.getAll('subcategory'));
      setSubCategoriesIds(ids);
      setPage(1);
    };

    fetchIds();
  }, [searchParams]);

  const queryArgs = {
    limit: productsPerPage,
    offset: (page - 1) * productsPerPage,
    priceCurrency: 'USD',
    ...(searchPhrase && { 'text.en': searchPhrase }),
    ...(subCategoriesIds.length && {
      'filter.query': `categories.id:"${subCategoriesIds.join('","')}"`,
    }),
  };

  const productsPerPage = 6;
  const {
    isPending,
    error,
    data,
  } = useQuery<ProductPagedQueryResponse>({
    queryKey: ['products', page, apiStore.api?.accessToken, searchPhrase, JSON.stringify(subCategoriesIds)],
    queryFn: async () => {
      if (!apiStore.api) {
        throw new Error('API not initialized');
      }
      const response = await apiStore.api.api
        .products()
        .get({ queryArgs })
        .execute();
      return response.body;
    },
    enabled: !!apiStore.api,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return `An error has occurred: ${error?.message ?? 'unknown'}`;
  }

  const total = data?.body.total ?? 0;

  return (
    <Skeleton visible={isFetching}>
      <div className={style['products-list']}>
        {data?.body.results.map((product) => (
          <div key={product.id} className={style['product-card']}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {!!total && <h1>Total: {total}</h1>}

      {!!total && <Pagination total={Math.ceil(total / productsPerPage)} mt={20} onChange={setPage} value={page} />}
    </Skeleton>
  );
};
