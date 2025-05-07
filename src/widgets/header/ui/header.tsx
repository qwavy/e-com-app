import { HeaderUserActions } from '../../headerUserActions';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.navigation}>
        <Link to="/" className={style['button-link']}>
          <h1 className={style.title}>Techhouse</h1>
        </Link>
        <div className={style['menu-page']}>
          <Link to="/catalog" className={style['button-link']}>
            Catalog
          </Link>
          <Link to="/about" className={style['button-link']}>
            About Us
          </Link>
        </div>
        <HeaderUserActions />
      </nav>
    </header>
  );
};
