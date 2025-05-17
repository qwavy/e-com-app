import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createClientBuilder } from '../base/client-builder';
import { setApi } from '../api';
import { tokenCache } from '../base/token-cache';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URI, PROJECT_KEY, scope } from '@shared/constants/constants';

export async function buildCustomerClient(email: string, password: string) {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow({
      host: OAUTH_URI,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: { username: email, password },
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    })
    .build();

  const apiInstance = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });

  const customerResponse = await apiInstance.me().get().execute();
  const tokens = tokenCache.get();
  const apiWithTokens = {
    api: apiInstance,
    accessToken: tokens?.token ?? '',
    refreshToken: tokens?.refreshToken,
  };

  setApi(apiWithTokens);

  return {
    customer: customerResponse.body,
    accessToken: tokens?.token,
    refreshToken: tokens?.refreshToken,
  };
}
