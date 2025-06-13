import { basketStore } from '@entities/basket/basket-store';
import { AddToBasketButton } from '@features/basket-button/ui/add-basket-button';
import { RemoveFromBasketButton } from '@features/basket-button/ui/remove-basket-button';
import { observer } from 'mobx-react-lite';

interface Props {
  productId: string;
  className?: string;
}

export const BasketButton = observer(({ productId }: Props) => {
  const item = basketStore.items.find((i) => i.productId === productId);
  const lineItemId = item?.id ?? null;

  return lineItemId ? <RemoveFromBasketButton lineItemId={lineItemId} /> : <AddToBasketButton productId={productId} />;
});
