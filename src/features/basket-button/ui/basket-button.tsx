import { basketStore } from '@entities/basket/basket-store';
import { Button } from '@mantine/core';
import { apiStore } from '@shared/api/store/api-store';
import React from 'react';

import BasketIcon from '../assets/basket.svg';
import styles from './basket-button.module.css';

interface Props {
  productId: string;
  className?: string;
}

export const BasketButton = ({ productId, className }: Props) => {
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
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  };

  return (
    <Button onClick={handleClick} className={className} variant="subtle">
      <img src={BasketIcon} alt="Basket icon" className={styles.basket} />
    </Button>
  );
};
