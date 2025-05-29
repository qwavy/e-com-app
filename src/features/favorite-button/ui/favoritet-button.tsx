import { Button } from '@mantine/core';
import { useState } from 'react';

import ActiveFavoriteIcon from '../assets/active-favorite.svg';
import FavoriteIcon from '../assets/favorite.svg';
import styles from './favorite-button.module.css';

interface Props {
  productId: string;
  className?: string;
}

export const FavoriteButton = ({ productId, className }: Props) => {
  const [activeFavorite, setActiveFavorite] = useState(false);
  const handleClick = () => {
    setActiveFavorite(!activeFavorite);
    console.log(`Add to favorite: ${productId}`);
  };

  return (
    <Button onClick={handleClick} className={className} variant="subtle">
      <img src={activeFavorite ? ActiveFavoriteIcon : FavoriteIcon} alt="Favorite icon" className={styles.favorite} />
    </Button>
  );
};
