import { Button, Card, Group, Image, Skeleton, Text } from '@mantine/core';
import { api } from '@shared/api/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ActiveFavoriteIcon from '../assets/active-favorite.svg';
import CartIcon from '../assets/cart.svg';
import FavoriteIcon from '../assets/favorite.svg';
import { getPrice } from '../uutils';

interface Props {
  id: string;
}

export const ProductCard = ({ id }: Props) => {
  const [activeFavorite, setActiveFavorite] = useState(false);
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ['product-projections', id],
    queryFn: () => api?.api.productProjections().withId({ ID: id }).get().execute(),
  });

  if (error) {
    return 'An error has occurred: ' + error.message;
  }

  const addToFavorite = (id: string) => {
    setActiveFavorite(!activeFavorite);
    console.log(id);
  };

  return (
    <Skeleton visible={isPending}>
      <Card withBorder radius="md" onClick={() => navigate(`/${id}`)} className="cursor-pointer">
        <Card.Section>
          <Image
            // eslint-disable-next-line max-len
            src="https://images.samsung.com/is/image/samsung/p6pim/kz_ru/qe75q70dauxce/gallery/kz-ru-qled-q70d-qe75q70dauxce-541256605?$684_547_PNG$"
            alt="product card"
            h={160}
            fit="scale-down"
          />
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          {data?.body.name.en}
        </Text>

        <Text size="sm" c="dimmed" mb={10}>
          {data?.body.description?.en}
        </Text>

        {data?.body?.masterVariant?.prices?.[0]?.value && (
          <Text size="lg" mb={10}>
            {getPrice(data.body.masterVariant.prices[0].value)} $
          </Text>
        )}

        <Group grow>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img src={CartIcon} />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToFavorite(id);
            }}
          >
            <img src={activeFavorite ? ActiveFavoriteIcon : FavoriteIcon} />
          </Button>
        </Group>
      </Card>
    </Skeleton>
  );
};
