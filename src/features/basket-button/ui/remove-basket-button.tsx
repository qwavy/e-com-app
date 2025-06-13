import { removeLineItem } from '@entities/basket/get-basket-items';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

type Props = {
  lineItemId: string;
};

export const RemoveFromBasketButton = ({ lineItemId }: Props) => {
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removeLineItem(lineItemId);
      showNotification({
        title: 'Удалено',
        message: 'Товар удалён из корзины 🗑️',
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (error) {
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось удалить товар 😢',
        color: 'red',
        icon: <IconX />,
      });
      console.error(error);
    }
  };

  return (
    <Button color="red" onClick={handleClick}>
      Remove from basket
    </Button>
  );
};
