import { userStore } from '@entities/user/model/user-store';
import { tokenCache } from '@shared/api/base/token-cache';

import { CustomerClientResult } from './build-customer-client';
import { buildCustomerClient } from './build-customer-client';

export async function restoreSession(): Promise<CustomerClientResult | null> {
  const refreshToken = localStorage.getItem('ct_refresh_token_customer');
  if (!refreshToken) {
    return null;
  }

  try {
    const result = await buildCustomerClient({ refreshToken });
    userStore.setUser(result.customer);
    if (result) {
      userStore.setUser(result.customer);
      tokenCache.set({
        token: result.accessToken,
        refreshToken: result.refreshToken,
        expirationTime: Date.now() + 60 * 60 * 1000,
      });
      if (result.refreshToken !== undefined) {
        localStorage.setItem('ct_refresh_token_customer', result.refreshToken);
      }
    }
    return result;
  } catch {
    localStorage.removeItem('ct_refresh_token_customer');
    return null;
  }
}
