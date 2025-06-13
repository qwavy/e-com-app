import { LineItem } from '@commercetools/platform-sdk';
import { ProductPrice } from '@entities/product/ui/product-price';
import { Card, Image, Text } from '@mantine/core';

type Props = {
  item: LineItem;
};

export const BasketItem = ({ item }: Props) => {
  const variant = item.variant;
  const FALLBACK_IMAGE_URL =
    'https://images.samsung.com/is/image/samsung/p6pim/kz_ru/qe75q70dauxce/gallery/' +
    'kz-ru-qled-q70d-qe75q70dauxce-541256605?$684_547_PNG$';
  const imageUrl = variant?.images?.[0]?.url ?? FALLBACK_IMAGE_URL;

  if (!variant) {
    return (
      <Card withBorder radius="md" p="md">
        <Text color="red">Ошибка: отсутствует информация о варианте товара</Text>
      </Card>
    );
  }

  return (
    <Card withBorder radius="md">
      <Card.Section>
        <Image src={imageUrl} alt={item.name.en} h={160} fit="contain" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {item.name.en}
      </Text>
      <ProductPrice priceObj={item.price?.value} discountedPriceObj={item.price?.discounted?.value} />
    </Card>
  );
};
