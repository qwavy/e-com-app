import { associateAnonymousCartWithUser } from '@entities/basket/get-basket-items';
import { userStore } from '@entities/user/model/user-store';
import { buildCustomerClient } from '@shared/api/client/build-customer-client';

export const loginAction = async (email: string, password: string, anonymousCartId?: string) => {
  try {
    if (anonymousCartId) {
      await associateAnonymousCartWithUser({ email, password, anonymousCartId });
    }

    const { customer, accessToken, refreshToken, basket } = await buildCustomerClient({
      email: email,
      password: password,
    });
    userStore.setUser(customer);

    return {
      success: true,
      customer,
      accessToken,
      refreshToken,
      basket,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Client build failed',
    };
  }
};
