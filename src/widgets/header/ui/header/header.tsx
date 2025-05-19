import { Paths } from '@shared/types/routerTypes';
import { Link } from 'react-router-dom';

import { HeaderUserActions } from '../header-user-actions/header-user-actions';
import style from './header.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.navigation}>
        <Link to={Paths.Home} className={style['button-link']}>
          <h1 className={style.title}>Techhouse</h1>
        </Link>
        <div className={style['menu-page']}>
          <Link to={Paths.Catalog} className={style['button-link']}>
            Catalog
          </Link>
          <Link to={Paths.About} className={style['button-link']}>
            About Us
          </Link>
        </div>
        <HeaderUserActions />
      </nav>
    </header>
  );
};
