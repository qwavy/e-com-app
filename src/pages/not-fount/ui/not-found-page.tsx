import IconError from '../assets/not-found.svg';
import { Link } from 'react-router-dom';
import { Paths } from '@shared/types/routerTypes';
import React from 'react';
import style from './not-found-page.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style['error-page']}>
      <div className={style['error-page-content']}>
        <h1>Error 404</h1>
        <p>Sorry, no such page found. Please return to the main page.</p>
        <Link to={Paths.Home} className={style['button-link']}>
          Return to the main page
        </Link>
      </div>
      <div className={style['error-page-image']}>
        <img src={IconError} alt="404" />
      </div>
    </div>
  );
};
