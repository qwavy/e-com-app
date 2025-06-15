import { basketStore } from '@entities/basket/basket-store';
import { getBasketItems } from '@entities/basket/get-basket-items';
import { Button, Stack, Text } from '@mantine/core';
import { BasketItems } from '@widgets/basket/ui/basket-Iitems';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const BasketPage = observer(() => {
  useEffect(() => {
    getBasketItems().then(basketStore.setItems.bind(basketStore)).catch(console.error);
  }, []);

  const isEmpty = basketStore.items.length === 0;

  return (
    <div>
      {isEmpty ? (
        <Stack align="center" mt="xl">
          <Text size="xl" fw={600}>
            🛒 Your basket is empty
          </Text>
          <Text size="md" c="dimmed" p="md">
            Add something from the catalog to start shopping.
          </Text>
          <Button component={Link} to="/catalog" variant="light">
            Go to Catalog
          </Button>
        </Stack>
      ) : (
        <BasketItems />
      )}
    </div>
  );
});
