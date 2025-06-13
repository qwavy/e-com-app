import { BasketItem } from '@entities/basket/BasketItem';
import { basketStore } from '@entities/basket/basket-store';
import { getBasketItems } from '@entities/basket/get-basket-items';
import { Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const BasketItems = observer(() => {
  useEffect(() => {
    getBasketItems().then(basketStore.setItems.bind(basketStore)).catch(console.error);
  }, []);

  return (
    <div>
      <Text fw={700} size="xl" mt="lg">
        Total Price: {(basketStore.totalPrice / 100).toFixed(2)} USD
      </Text>
      {basketStore.items.map((item) => (
        <div key={item.id}>
          <BasketItem lineItemId={item.id} />
        </div>
      ))}
    </div>
  );
});
