import { TokenStore } from '@commercetools/ts-client';

type TokenType = 'anonymous' | 'customer';

let tokenType: TokenType = 'anonymous';

const TOKEN_KEYS = {
  customer: {
    accessToken: 'ct_access_token_customer',
    refreshToken: 'ct_refresh_token_customer',
    expiration: 'ct_token_expiration_customer',
  },
  anonymous: {
    accessToken: 'ct_access_token_anonymous',
    refreshToken: 'ct_refresh_token_anonymous',
    expiration: 'ct_token_expiration_anonymous',
  },
};

export const tokenCache = {
  setTokenType(type: 'anonymous' | 'customer') {
    tokenType = type;
  },

  get(): TokenStore {
    const keys = TOKEN_KEYS[tokenType];
    const token = localStorage.getItem(keys.accessToken) || '';
    const refreshToken = localStorage.getItem(keys.refreshToken) || '';
    const expirationTime = Number(localStorage.getItem(keys.expiration)) || 0;

    return {
      token,
      refreshToken,
      expirationTime,
    };
  },

  set(token: TokenStore): void {
    const keys = TOKEN_KEYS[tokenType];
    localStorage.setItem(keys.accessToken, token.token);
    if (token.refreshToken) {
      localStorage.setItem(keys.refreshToken, token.refreshToken);
    }
    localStorage.setItem(keys.expiration, String(token.expirationTime));
  },

  clear(): void {
    Object.values(TOKEN_KEYS).forEach(({ accessToken, refreshToken, expiration }) => {
      localStorage.removeItem(accessToken);
      localStorage.removeItem(refreshToken);
      localStorage.removeItem(expiration);
    });
  },
};
