import { Product } from '@commercetools/platform-sdk';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import { Paths } from '@shared/types/routerTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ActiveFavoriteIcon from '../assets/active-favorite.svg';
import CartIcon from '../assets/cart.svg';
import FavoriteIcon from '../assets/favorite.svg';
import { ProductPrice } from './product-price';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [activeFavorite, setActiveFavorite] = useState(false);
  const navigate = useNavigate();
  const productInfo = product.masterData.current;

  const addToFavorite = (id: string) => {
    setActiveFavorite(!activeFavorite);
    console.log(id);
  };

  return (
    <Card
      withBorder
      radius="md"
      onClick={() => navigate(Paths.Product.replace(':id', product.id))}
      className="cursor-pointer"
    >
      <Card.Section>
        <Image
          src={
            productInfo.masterVariant?.images[0]?.url ??
            // eslint-disable-next-line max-len
            'https://images.samsung.com/is/image/samsung/p6pim/kz_ru/qe75q70dauxce/gallery/kz-ru-qled-q70d-qe75q70dauxce-541256605?$684_547_PNG$'
          }
          alt="product card"
          h={160}
          fit="contain"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {productInfo.name.en}
      </Text>

      <Text size="sm" c="dimmed" mb={10}>
        {productInfo.description?.en}
      </Text>

      <ProductPrice
        priceObj={productInfo.masterVariant.price?.value}
        discountedPriceObj={productInfo.masterVariant.price?.discounted?.value}
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
