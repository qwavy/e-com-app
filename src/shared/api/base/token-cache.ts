import { TokenStore } from '@commercetools/ts-client';

const accessTokenKey = 'ct_access_token';
const refreshTokenKey = 'ct_refresh_token';
const expirationKey = 'ct_token_expiration';

export const tokenCache = {
  get(): TokenStore {
    const token = localStorage.getItem(accessTokenKey) || '';
    const refreshToken = localStorage.getItem(refreshTokenKey) || '';
    const expirationTime = Number(localStorage.getItem(expirationKey)) || 0;

    return {
      token,
      refreshToken,
      expirationTime,
    };
  },

  set(token: TokenStore): void {
    localStorage.setItem(accessTokenKey, token.token);
    if (token.refreshToken) {
      localStorage.setItem(refreshTokenKey, token.refreshToken);
    }
    localStorage.setItem(expirationKey, String(token.expirationTime));
  },

  clear(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(expirationKey);
  },
};
