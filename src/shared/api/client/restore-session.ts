import { userStore } from '@entities/user/model/user-store';

import { CustomerClientResult } from './build-customer-client';
import { buildCustomerClient } from './build-customer-client';

export async function restoreSession(): Promise<CustomerClientResult | null> {
  const refreshToken = localStorage.getItem('ct_refresh_token');
  if (!refreshToken) {
    return null;
  }

  try {
    const result = await buildCustomerClient({ refreshToken });
    userStore.setUser(result.customer);
    return result;
  } catch {
    localStorage.removeItem('ct_refresh_token');
    return null;
  }
}
