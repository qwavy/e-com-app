import AboutPage from '@pages/about/about';
import BasketPage from '@pages/basket/basket';
import CatalogPage from '@pages/catalog/catalog';
import { Login } from '@pages/login';
import MainPage from '@pages/main/main';
import ProductPage from '@pages/product/product';
import RegistrationPage from '@pages/registration/registration';
import { Paths, RouteType } from '@shared/types/routerTypes';

export const mainRoutes: RouteType[] = [
  { path: Paths.Home, element: MainPage },
  { path: Paths.Catalog, element: CatalogPage },
  { path: Paths.About, element: AboutPage },
  { path: Paths.Basket, element: BasketPage },
  { path: Paths.Product, element: ProductPage },
];

export const authRoutes: RouteType[] = [
  { path: Paths.Login, element: Login },
  { path: Paths.Registration, element: RegistrationPage },
];
