import { buildCustomerClient } from '@shared/api/client/build-customer-client';

export const loginAction = async (email: string, password: string) => {
  try {
    const { customer, accessToken, refreshToken } = await buildCustomerClient(email, password);
    console.log(customer, accessToken, refreshToken);

    return {
      success: true,
      customer,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Client build failed',
    };
  }
};
