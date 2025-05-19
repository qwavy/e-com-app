import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URL, PROJECT_KEY, scope } from '@shared/constants/constants';

import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';

export async function buildAnonymousClient() {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        anonymousId: crypto.randomUUID(),
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    })
    .build();

  const apiInstance = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });

  await apiInstance.get().execute();

  return {
    api: apiInstance,
    accessToken: tokenCache.get()?.token,
    refreshToken: tokenCache.get()?.refreshToken,
  };
}
