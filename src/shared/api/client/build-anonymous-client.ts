import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { basketStore } from '@entities/basket/basket-store';
import { createAnonymousBasket } from '@entities/basket/get-basket-items';
import { apiStore } from '@shared/api/store/api-store';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URL, PROJECT_KEY, scope } from '@shared/constants/constants';

import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';

export async function buildAnonymousClient(retries = 1) {
  const maxRetries = 2;

  tokenCache.clear();
  tokenCache.setTokenType('anonymous');

  const anonymousId = apiStore.getAnonymousId();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        anonymousId,
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    })
    .build();

  const apiInstance = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });

  try {
    // await apiInstance.get().execute();
    apiStore.setAnonymousId(anonymousId);
    apiStore.setApi({
      api: apiInstance,
      accessToken: tokenCache.get()?.token ?? '',
      refreshToken: tokenCache.get()?.refreshToken ?? '',
    });

    const basket = await createAnonymousBasket();
    console.log('Anonymous basket', basket);
    basketStore.setBasket(basket);
    return {
      api: apiInstance,
      accessToken: tokenCache.get()?.token,
      refreshToken: tokenCache.get()?.refreshToken,
    };
  } catch (error: unknown) {
    const err = error as Error;
    const isAnonymousIdError = err.message?.includes('anonymousId is already in use');

    if (isAnonymousIdError && retries < maxRetries) {
      localStorage.removeItem('anonymous_id');
      apiStore.clearAnonymousId();
      return buildAnonymousClient(retries + 1);
    }

    console.error('Ошибка при создании анонимного клиента:', error);
    throw error;
  }
}
