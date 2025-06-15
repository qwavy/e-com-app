import { userStore } from '@entities/user/model/user-store';
import { apiStore } from '@shared/api/store/api-store';

export function getCartApi(api: typeof apiStore.apiClient | null) {
  if (!api) {
    throw new Error('API client is not initialized');
  }

  return userStore.user ? api.me().carts() : api.carts();
}
