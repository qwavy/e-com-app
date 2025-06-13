import { basketStore } from '@entities/basket/basket-store';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { apiStore } from '@shared/api/store/api-store';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

import BasketIcon from '../assets/basket.svg';
import styles from './basket-button.module.css';

interface Props {
  productId: string;
  className?: string;
}

export const AddToBasketButton = ({ productId }: Props) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const basket = basketStore.basket;
      const api = apiStore.apiClient;

      if (!api || !basket) {
        console.warn('Корзина или API не доступны');
        return;
      }

      const response = await api
        .me()
        .carts()
        .withId({ ID: basket.id })
        .post({
          body: {
            version: basket.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                quantity: 1,
              },
            ],
          },
        })
        .execute();

      basketStore.setBasket(response.body);
      showNotification({
        title: 'Добавлено',
        message: 'Товар добавлен в корзину 🛒',
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (error) {
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось добавить товар 😢',
        color: 'red',
        icon: <IconX />,
      });
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} className={styles.add} variant="subtle">
      <img src={BasketIcon} alt="Basket icon" className={styles.basket} />
    </Button>
  );
};
