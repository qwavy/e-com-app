import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URI, PROJECT_KEY, scope } from '@shared/constants/constants';
export async function buildAnonymousClient() {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow({
      host: OAUTH_URI,
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

  const tokens = tokenCache.get();
  const apiWithTokens = {
    api: apiInstance,
    accessToken: tokens?.token ?? '',
    refreshToken: tokens?.refreshToken,
  };
  console.log(apiWithTokens);

  return {
    api: apiInstance,
    accessToken: tokenCache.get()?.token,
    refreshToken: tokenCache.get()?.refreshToken,
  };
}
