import { ProductSearch } from '@features/product-search';
import { ProductsList } from '@widgets/products-list';
import { ProductsSidebar } from '@widgets/products-sidebar';

import style from './catalog.module.css';

export const CatalogPage = () => {
  return (
    <div className={style['container-page']}>
      <ProductsSidebar />
      <ProductSearch />
      <ProductsList />
    </div>
  );
};
