import { LineItem } from '@commercetools/platform-sdk';
import { Cart as Basket } from '@commercetools/platform-sdk';
import {
  AnonymousCartSignInMode,
  CartResourceIdentifier,
  CustomerSignInResult,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { getCartApi } from '@entities/basket/get-cart-api';
import { tokenCache } from '@shared/api/base/token-cache';
import { apiStore } from '@shared/api/store/api-store';

import { basketStore } from './basket-store';

export async function createCustomerBasket(): Promise<Basket> {
  const api = apiStore.apiClient;
  if (!api) {
    throw new Error('API client is not initialized');
  }
  try {
    const existingCart = await api.me().activeCart().get().execute();
    return existingCart.body;
  } catch (err) {
    console.log(err);
    const response = await api
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();

    return response.body;
  }
}

export async function createAnonymousBasket(): Promise<Basket> {
  const api = apiStore.apiClient;
  if (!api) {
    throw new Error('API client is not initialized');
  }
  const response = await api
    .carts()
    .post({
      body: {
        currency: 'USD',
        anonymousId: apiStore.getAnonymousId(),
      },
    })
    .execute();

  return response.body;
}

export async function createBasket(isCustomer: boolean): Promise<Basket> {
  const api = apiStore.apiClient;
  if (!api) {
    throw new Error('API client is not initialized');
  }
  const basketRequest = isCustomer
    ? api
        .me()
        .carts()
        .post({ body: { currency: 'EUR' } })
    : api.carts().post({
        body: {
          currency: 'USD',
          anonymousId: apiStore.getAnonymousId(),
        },
      });

  const response = await basketRequest.execute();
  return response.body;
}

export async function getBasketItems(): Promise<LineItem[]> {
  const api = apiStore.apiClient;
  const basket = basketStore.basket;

  if (!api) {
    throw new Error('API client is not initialized');
  }
  if (!basket) {
    throw new Error('Basket is not initialized');
  }

  const cartApi = getCartApi(api);
  const response = await cartApi.withId({ ID: basket.id }).get().execute();
  basketStore.setBasket(response.body);

  return response.body.lineItems;
}

export const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
  const cartId = basketStore.basket?.id;
  const version = basketStore.basket?.version;
  const api = apiStore.apiClient;

  if (!cartId || version === undefined) {
    throw new Error('Корзина не инициализирована');
  }
  if (!api) {
    throw new Error('API client is not initialized');
  }
  const cartApi = getCartApi(api);
  const response = await cartApi
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

  basketStore.setBasket(response.body);
};

export async function removeLineItem(lineItemId: string): Promise<void> {
  const api = apiStore.apiClient;
  if (!api) {
    throw new Error('API client is not initialized');
  }
  const cart = await api.me().activeCart().get().execute();

  const cartApi = getCartApi(api);
  const response = await cartApi
    .withId({ ID: cart.body.id })
    .post({
      body: {
        version: cart.body.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
    })
    .execute();
  basketStore.setBasket(response.body);
}

interface MyCustomerSignInWithCart extends MyCustomerSignin {
  anonymousCart?: CartResourceIdentifier;
  anonymousCartSignInMode?: AnonymousCartSignInMode;
}

export async function associateAnonymousCartWithUser({
  email,
  password,
  anonymousCartId,
}: {
  email: string;
  password: string;
  anonymousCartId?: string;
}): Promise<CustomerSignInResult> {
  const api = apiStore.apiClient;

  if (!api) {
    throw new Error('API client is not initialized');
  }

  const body: MyCustomerSignInWithCart = {
    email,
    password,
  };

  if (anonymousCartId) {
    body.anonymousCart = {
      id: anonymousCartId,
      typeId: 'cart',
    } as CartResourceIdentifier;

    body.anonymousCartSignInMode = 'MergeWithExistingCustomerCart' as AnonymousCartSignInMode;
  }
  const response = await api.me().login().post({ body }).execute();

  localStorage.removeItem('anonymous_id');
  apiStore.clearAnonymousId();
  tokenCache.clear();

  return response.body;
}
