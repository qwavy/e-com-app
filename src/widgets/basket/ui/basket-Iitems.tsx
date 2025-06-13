import { BasketItem } from '@entities/basket/BasketItem';
import { basketStore } from '@entities/basket/basket-store';
import { getBasketItems } from '@entities/basket/get-basket-items';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const BasketItems = observer(() => {
  useEffect(() => {
    getBasketItems().then(basketStore.setItems.bind(basketStore)).catch(console.error);
  }, []);

  return (
    <div>
      {basketStore.items.map((item) => (
        <div key={item.id}>
          <BasketItem item={item} />
        </div>
      ))}
    </div>
  );
});
