import { Button } from '@mantine/core';

import BasketIcon from '../assets/basket.svg';
import styles from './basket-button.module.css';

interface Props {
  productId: string;
  className?: string;
}

export const BasketButton = ({ productId, className }: Props) => {
  const handleClick = () => {
    console.log(`Add to basket: ${productId}`);
  };

  return (
    <Button onClick={handleClick} className={className} variant="subtle">
      <img src={BasketIcon} alt="Basket icon" className={styles.basket} />
    </Button>
  );
};
