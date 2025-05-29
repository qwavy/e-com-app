import { BasketButton } from '@features/basket-button/index';
import { FavoriteButton } from '@features/favorite-button/index';
import { Grid, Group, Image, Skeleton, Text } from '@mantine/core';
import { useProductDetails } from '@shared/api/endpoints/product/get-product';
import { getPrice } from '@shared/utils/get-price';
import { useParams } from 'react-router-dom';

import styles from './product-details.module.css';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, error } = useProductDetails(id || '');

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const product = data?.body;
  console.log(product);

  return (
    <Skeleton visible={isPending}>
      <Group className={styles.container}>
        <Grid gutter="30">
          <Grid.Col span={{ base: 12, xs: 6 }} className={styles.image}>
            <div className={styles['main-image']}>
              <Image
                src={product?.masterVariant.images?.[0]?.url}
                alt={product?.name?.en}
                fit="contain"
                style={{ width: '70%', height: 'auto' }}
              />
            </div>
            <Group className={styles.images}>
              {product?.masterVariant.images?.map((img, index) => (
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
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }} className={styles.content}>
            <Text size="xl" fw={600}>
              {product?.name?.en}
            </Text>
            {product?.masterVariant?.prices?.[0]?.value ? (
              <Text size="lg">{getPrice(product.masterVariant.prices[0].value)} $</Text>
            ) : null}
            <Group mt="md" style={{ gap: '10px' }}>
              <BasketButton productId={id || ''} className={styles.basket} />
              <FavoriteButton productId={id || ''} className={styles.favorite} />
            </Group>
          </Grid.Col>
        </Grid>
        <Text style={{ marginTop: '20px', width: '100%' }}>{product?.description?.en}</Text>
      </Group>
    </Skeleton>
  );
};
