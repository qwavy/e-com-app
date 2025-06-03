import { Product } from '@commercetools/platform-sdk';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import { Paths } from '@shared/types/routerTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ActiveFavoriteIcon from '../assets/active-favorite.svg';
import CartIcon from '../assets/cart.svg';
import FavoriteIcon from '../assets/favorite.svg';
import styles from './ProductCard.module.css';
import { ProductPrice } from './product-price';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [activeFavorite, setActiveFavorite] = useState(false);
  const navigate = useNavigate();
  const FALLBACK_IMAGE_URL =
    'https://images.samsung.com/is/image/samsung/p6pim/kz_ru/qe75q70dauxce/gallery/' +
    'kz-ru-qled-q70d-qe75q70dauxce-541256605?$684_547_PNG$';
  const imageUrl = product.masterData.current.masterVariant?.images?.[0]?.url ?? FALLBACK_IMAGE_URL;
  const addToFavorite = (id: string) => {
    setActiveFavorite(!activeFavorite);
    console.log(id);
  };

  return (
    <Card
      withBorder
      radius="md"
      onClick={() => navigate(Paths.Product.replace(':id', product.id))}
      className={`cursor-pointer ${styles.card}`}
    >
      <Card.Section>
        <Image src={imageUrl} alt="product card" h={160} fit="contain" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {product.masterData?.current?.name?.en}
      </Text>

      <Text size="sm" c="dimmed" mb={10}>
        {product.masterData?.current?.description?.en}
      </Text>

      <ProductPrice
        priceObj={product.masterData?.current?.masterVariant.price?.value}
        discountedPriceObj={product.masterData?.current?.masterVariant.price?.discounted?.value}
      />

      <Group grow>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={CartIcon} alt="Cart icon" />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToFavorite(product.id);
          }}
        >
          <img src={activeFavorite ? ActiveFavoriteIcon : FavoriteIcon} alt="Favorite icon" />
        </Button>
      </Group>
    </Card>
  );
};
