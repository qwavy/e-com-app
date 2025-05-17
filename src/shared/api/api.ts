import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, TokenStore } from '@commercetools/ts-client';

import { BASE_URI, CLIENT_ID, CLIENT_SECRET, OAUTH_URI, PROJECT_KEY, scope } from '../constants/constants';

const httpOptions = {
  host: BASE_URI,
  httpClient: fetch,
};

const tokenKey = 'ct_token';

const tokenCache = {
  get: () => {
    const raw = localStorage.getItem(tokenKey);

    if (raw) {
      return JSON.parse(raw) as TokenStore;
    }
    return {} as TokenStore;
  },

  set: (token: TokenStore) => {
    localStorage.setItem(tokenKey, JSON.stringify(token));
  },

  clear: () => localStorage.removeItem(tokenKey),
};
export function buildAnonymousClient() {
  const anonymousId = localStorage.getItem('ct_anonymous_id') || crypto.randomUUID();

  localStorage.setItem('ct_anonymous_id', anonymousId);

  const client = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow({
      host: OAUTH_URI,
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
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
}

export function buildCustomerClient(email: string, password: string) {
  tokenCache.clear();

  const client = new ClientBuilder()
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
    .withHttpMiddleware(httpOptions)
    .build();

  api = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
}

export let api = buildAnonymousClient();
