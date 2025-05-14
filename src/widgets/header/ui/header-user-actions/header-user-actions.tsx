import IconArrow from '../../assets/arrow.svg';
import IconBasket from '../../assets/basket.svg';
import IconProfile from '../../assets/profile-icon.svg';
import { Link } from 'react-router-dom';
import { Paths } from '@shared/types/routerTypes';
import style from './header-user-actions.module.css';
import { useState } from 'react';

export function HeaderUserActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={style['user-controls']}>
      <Link to={Paths.Basket} className={style['button-link']}>
        <img className={style.basket} src={IconBasket} alt="Basket" />
      </Link>
      <div className={style.profile}>
        <button type="button" onClick={toggleMenu} className={style['button-link']}>
          <img className={style['profile-icon']} src={IconProfile} alt="Profile" />
          <img className={`${style.arrow} ${isMenuOpen ? style.arrowOpen : ''}`} src={IconArrow} alt="Arrow" />
        </button>
        {isMenuOpen && (
          <div className={style['menu-profile']}>
            <Link to={Paths.Login} onClick={closeMenu} className={style['button-link']}>
              Login
            </Link>
            <Link to={Paths.Registration} onClick={closeMenu} className={style['button-link']}>
              Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
