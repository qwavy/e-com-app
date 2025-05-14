import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { buildCustomerClient } from '@shared/api/api';
import { loginEndpoint } from '@shared/api/endpoints/auth/auth';

export const loginAction = async (email: string, password: string) => {
  const response = await loginEndpoint(email, password);
  if (response.statusCode === SUCCESSFUL_RESPONSE_CODE) {
    buildCustomerClient(email, password);
  }
};
