import { ProductPrice } from '@entities/product/ui/product-price';
import { BasketButton } from '@features/basket-button/index';
import { FavoriteButton } from '@features/favorite-button/index';
import { Group, Image, Skeleton, Text } from '@mantine/core';
import { useProductDetails } from '@shared/api/endpoints/product/get-product';
// import { getPrice } from '@shared/utils/get-price';
import { useParams } from 'react-router-dom';

import styles from './product-details.module.css';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, error } = useProductDetails(id || '');

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const productInfo = data?.masterData.current;
  if (!productInfo) {
    return null;
  }
  const priceObj = productInfo.masterVariant.prices?.[0]?.value;
  const discountedPriceObj = productInfo.masterVariant.prices?.[0]?.discounted?.value;
  const imageObj = productInfo.masterVariant.images?.[0]?.url;

  return (
    <Skeleton visible={isPending}>
      <Group className={styles.container}>
        <div className={styles.box}>
          <div className={styles.image}>
            <div className={styles['main-image']}>
              <Image src={imageObj} alt={productInfo.name.en} fit="contain" style={{ width: '70%', height: '70%' }} />
            </div>
            <Group className={styles.images}>
              {productInfo?.masterVariant.images?.map((img, index) => (
                <Image
                  key={index}
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: '100px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    height: '100px',
                    backgroundColor: 'var(--color-gray)',
                  }}
                />
              ))}
            </Group>
          </div>
          <div className={styles.content}>
            <Text size="xl" fw={600}>
              {productInfo.name.en}
            </Text>
            <ProductPrice priceObj={priceObj} discountedPriceObj={discountedPriceObj} />
            <Group mt="md" style={{ gap: '10px' }}>
              <BasketButton productId={id || ''} className={styles.basket} />
              <FavoriteButton productId={id || ''} className={styles.favorite} />
            </Group>
          </div>
        </div>
        <Text style={{ marginTop: '20px', width: '100%' }}>{productInfo.description?.en}</Text>
      </Group>
    </Skeleton>
  );
};
