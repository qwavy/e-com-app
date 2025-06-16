import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder, Customer } from '@commercetools/platform-sdk';
import type { Cart as Basket } from '@commercetools/platform-sdk';
import { basketStore } from '@entities/basket/basket-store';
import { createCustomerBasket } from '@entities/basket/get-basket-items';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URL, PROJECT_KEY, scope } from '@shared/constants/constants';

import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';
import { apiStore } from '../store/api-store';

type LoginOptions =
  | { email: string; password: string; refreshToken?: never }
  | { refreshToken: string; email?: never; password?: never };

export interface CustomerClientResult {
  customer: Customer;
  accessToken: string;
  refreshToken?: string;
  api: ByProjectKeyRequestBuilder;
  basket?: Basket;
}

function clearAccessTokenKeepRefresh() {
  const tokens = tokenCache.get();
  if (tokens) {
    tokenCache.set({
      token: '',
      refreshToken: tokens.refreshToken,
      expirationTime: tokens.expirationTime,
    });
  } else {
    tokenCache.clear();
  }
}

export async function buildCustomerClient(options: LoginOptions): Promise<CustomerClientResult> {
  tokenCache.setTokenType('customer');
  clearAccessTokenKeepRefresh();
  const clientBuilder = createClientBuilder().withProjectKey(PROJECT_KEY);

  if (options && typeof options === 'object' && 'refreshToken' in options && options.refreshToken) {
    clientBuilder.withRefreshTokenFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      refreshToken: options.refreshToken,
      httpClient: fetch,
      tokenCache,
    });
  } else {
    if (!options.email || !options.password) {
      throw new Error('Email and password must be provided when no refreshToken');
    }
    clientBuilder.withPasswordFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: {
          username: options.email,
          password: options.password,
        },
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    });
  }

  const client = clientBuilder.build();
  const apiInstance = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
  const customerResponse = await apiInstance.me().get().execute();
  const tokens = tokenCache.get();

  tokenCache.set({
    token: tokens.token,
    refreshToken: tokens.refreshToken,
    expirationTime: tokens.expirationTime,
  });

  const apiWithTokens = {
    api: apiInstance,
    accessToken: tokens?.token ?? '',
    refreshToken: tokens?.refreshToken,
  };

  apiStore.setApi(apiWithTokens);

  const basket = await createCustomerBasket();
  console.log('Customer basket', basket);

  basketStore.setBasket(basket);

  return {
    customer: customerResponse.body,
    accessToken: tokens?.token,
    refreshToken: tokens?.refreshToken,
    api: apiInstance,
  };
}
