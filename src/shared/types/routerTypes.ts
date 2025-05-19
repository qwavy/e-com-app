import { ReactElement } from 'react';

export interface RouteType {
  path: string;
  element: ReactElement;
}

export const Paths = {
  Home: '/',
  Catalog: '/catalog',
  About: '/about',
  Basket: '/basket',
  Product: '/product/:id',
  Login: '/login',
  Registration: '/registration',
  Error: '*',
  Profile: '/profile',
} as const;
