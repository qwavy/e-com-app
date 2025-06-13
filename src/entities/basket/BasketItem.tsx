import { updateLineItemQuantity } from '@entities/basket/get-basket-items';
import { ProductPrice } from '@entities/product/ui/product-price';
import { Card, Image, Text } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { basketStore } from './basket-store';

type Props = {
  lineItemId: string;
};

export const BasketItem = observer(({ lineItemId }: Props) => {
  const item = basketStore.items.find((i) => i.id === lineItemId);
  const variant = item?.variant;

  if (!item || !variant) {
    return (
      <Card withBorder radius="md" p="md">
        <Text color="red">Ошибка: товар не найден</Text>
      </Card>
    );
  }

  const FALLBACK_IMAGE_URL =
    'https://images.samsung.com/is/image/samsung/p6pim/kz_ru/qe75q70dauxce/gallery/' +
    'kz-ru-qled-q70d-qe75q70dauxce-541256605?$684_547_PNG$';
  const imageUrl = variant?.images?.[0]?.url ?? FALLBACK_IMAGE_URL;

  const handleQuantityChange = async (newQuantity: number) => {
    if (!newQuantity || newQuantity === item.quantity) {
      return;
    }
    try {
      await updateLineItemQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Ошибка при обновлении количества товара', error);
    }
  };

  return (
    <Card withBorder radius="md">
      <Card.Section>
        <Image src={imageUrl} alt={item.name.en} h={160} fit="contain" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {item.name.en}
      </Text>
      <ProductPrice priceObj={item.price?.value} discountedPriceObj={item.price?.discounted?.value} />
      <Text size="sm" mt="xs">
        Total Price : {(item.totalPrice.centAmount / 100).toFixed(2)} {item.totalPrice.currencyCode}
      </Text>
      <NumberInput
        value={item.quantity}
        min={1}
        onChange={(value) => handleQuantityChange(value as number)}
        label="Количество"
        mt="md"
      />
    </Card>
  );
});
