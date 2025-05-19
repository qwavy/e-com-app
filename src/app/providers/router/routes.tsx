import { AboutPage } from '@pages/about/about';
import { BasketPage } from '@pages/basket/basket';
import { CatalogPage } from '@pages/catalog/catalog';
import { LoginPage } from '@pages/login/index';
import { MainPage } from '@pages/main/main';
import { NotFoundPage } from '@pages/not-fount/index';
import { ProductPage } from '@pages/product/product';
import { ProfilePage } from '@pages/profile/profile';
import { RegistrationPage } from '@pages/registration/registration';
import { AuthRedirect } from '@shared/router/auth-redirect';
import { PrivateRoute } from '@shared/router/private-route';
import { Paths, RouteType } from '@shared/types/routerTypes';

export const mainRoutes: RouteType[] = [
  { path: Paths.Home, element: <MainPage /> },
  { path: Paths.Catalog, element: <CatalogPage /> },
  { path: Paths.About, element: <AboutPage /> },
  { path: Paths.Basket, element: <BasketPage /> },
  { path: Paths.Product, element: <ProductPage /> },
  { path: Paths.Error, element: <NotFoundPage /> },
  {
    path: Paths.Profile,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
];

export const authRoutes: RouteType[] = [
  {
    path: Paths.Login,
    element: (
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>
    ),
  },
  {
    path: Paths.Registration,
    element: (
      <AuthRedirect>
        <RegistrationPage />
      </AuthRedirect>
    ),
  },
];
