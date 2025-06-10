import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '@entities/product';
import { Loader, Pagination, Skeleton } from '@mantine/core';
import { apiStore } from '@shared/api/store/api-store';
import { useQueries } from '@tanstack/react-query';
import { getCategoriesByKeys } from '@widgets/products-list/model';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import style from './products-list.module.css';

type QueryParam = string | string[] | number | boolean | undefined;
type QueryArgs = {
  limit?: number;
  offset?: number;
  priceCurrency?: string;
  sort?: string[];
  text?: string;
  'filter.query'?: string;
  [key: string]: QueryParam;
};

export const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const searchPhrase = (searchParams.get('q') ?? '').trim();
  const [subCategoriesIds, setSubCategoriesIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const sort = searchParams.get('sort') ?? '';
  const productsPerPage = 6;

  const mapSortParam = (sortStr: string) => {
    switch (sortStr) {
      case 'name-asc':
      case 'name-desc':
        return undefined;
      default:
        return sortStr;
    }
  };

  const sortParam = mapSortParam(sort);

  useEffect(() => setPage(1), [searchPhrase]);

  useEffect(() => {
    const fetchIds = async () => {
      const ids = await getCategoriesByKeys(searchParams.getAll('subcategory'));
      const filteredIds = ids.filter((id): id is string => typeof id === 'string');
      setSubCategoriesIds(filteredIds);
      setPage(1);
    };
    fetchIds();
  }, [searchParams]);

  const fetchProductsForCategory = async (categoryId: string) => {
    if (!apiStore.api) {
      throw new Error('API not initialized');
    }

    const queryArgs: QueryArgs = {
      limit: 100,
      offset: 0,
      priceCurrency: 'USD',
      ...(sortParam ? { sort: [sortParam] } : {}),
    };

    if (categoryId) {
      queryArgs['filter.query'] = `categories.id:"${categoryId}"`;
    }

    const response = await apiStore.api.api
      .productProjections()
      .search()
      .get({
        queryArgs,
      })
      .execute();

    return response.body.results;
  };

  const queries = useQueries({
    queries:
      subCategoriesIds.length > 0
        ? subCategoriesIds.map((id) => ({
            queryKey: ['products', id, sortParam],
            queryFn: () => fetchProductsForCategory(id),
            enabled: !!apiStore.api,
          }))
        : [
            {
              queryKey: ['products', 'all', sortParam],
              queryFn: async () => {
                if (!apiStore.api) {
                  throw new Error('API not initialized');
                }
                const queryArgs: QueryArgs = {
                  limit: 100,
                  offset: 0,
                  priceCurrency: 'USD',
                  ...(sortParam ? { sort: [sortParam] } : {}),
                };
                const response = await apiStore.api.api
                  .productProjections()
                  .search()
                  .get({
                    queryArgs,
                  })
                  .execute();
                return response.body.results;
              },
              enabled: !!apiStore.api,
            },
          ],
  });

  const allResults = useMemo(() => {
    if (queries.some((q) => q.isLoading)) {
      return null;
    }
    if (queries.some((q) => q.isError)) {
      return null;
    }

    const productsArrays = queries.map((q) => q.data ?? []);
    const uniqueMap = new Map<string, ProductProjection>();
    productsArrays.flat().forEach((product) => {
      uniqueMap.set(product.id, product);
    });
    let uniqueProducts = Array.from(uniqueMap.values());

    if (searchPhrase) {
      const lowerSearch = searchPhrase.toLowerCase();
      uniqueProducts = uniqueProducts.filter((product) => {
        const name = product.name?.en ?? '';
        return name.toLowerCase().includes(lowerSearch);
      });
    }

    if (sort === 'name-asc' || sort === 'name-desc') {
      const ascending = sort === 'name-asc';
      uniqueProducts.sort((a, b) => {
        const aName = a.name?.en ?? '';
        const bName = b.name?.en ?? '';
        if (aName < bName) {
          return ascending ? -1 : 1;
        }
        if (aName > bName) {
          return ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return uniqueProducts;
  }, [queries, sort, sortParam, searchPhrase]);

  const paginatedResults = useMemo(() => {
    if (!allResults) {
      return [];
    }
    const start = (page - 1) * productsPerPage;
    return allResults.slice(start, start + productsPerPage);
  }, [allResults, page]);

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.isError)?.error;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>An error has occurred: {(error as Error)?.message ?? 'unknown'}</div>;
  }

  const total = allResults?.length ?? 0;

  return (
    <Skeleton visible={isLoading}>
      <div className={style['products-list']}>
        {paginatedResults.map((product) => (
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
