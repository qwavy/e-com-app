import { TypedMoney } from '@commercetools/platform-sdk';
import { Group, Text } from '@mantine/core';

import { getPercent, getPrice } from '../uutils';

interface Props {
  priceObj: TypedMoney;
  discountedPriceObj: TypedMoney;
}

export const ProductPrice = ({ priceObj, discountedPriceObj }: Props) => {
  if (discountedPriceObj) {
    return (
      <Group>
        <Text size="lg" mb={10}>
          {getPrice(discountedPriceObj)} $
        </Text>
        <Text size="lg" mb={10} td="line-through">
          {getPrice(priceObj)} $
        </Text>
        <Text size="lg" mb={10} c="green.6">
          {getPercent(priceObj, discountedPriceObj)} % off
        </Text>
      </Group>
    );
  }

  return (
    <Text size="lg" mb={10}>
      {getPrice(priceObj)} $
    </Text>
  );
};
