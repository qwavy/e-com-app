import { basketStore } from '@entities/basket/basket-store';
import { Paths } from '@shared/types/routerTypes';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import IconBasket from './assets/basket.svg';
import style from './basket-link.module.css';

export const BasketLink = observer(() => {
  const itemCount = basketStore.items.length;

  return (
    <Link to={Paths.Basket} className={style['button-link']}>
      <img className={style.basket} src={IconBasket} alt="Basket" />
      {itemCount > 0 && <span className={style['item-count']}>{itemCount}</span>}
    </Link>
  );
});
