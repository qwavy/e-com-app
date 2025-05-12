import React from 'react';

export interface RouteType {
  path: string;
  element: React.ComponentType;
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
} as const;
