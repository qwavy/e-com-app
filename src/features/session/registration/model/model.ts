import { RegistrationFields } from '../ui/Registration-form';
import { SUCCESSFUL_REGISTER_CODE } from '@shared/constants/constants';
import { buildCustomerClient } from '@shared/api/api';
import { createCustomer } from '@shared/api/endpoints/createCustomer/createCustomer';

interface Error {
  message: string;
}

export const registerAction = async (data: RegistrationFields) => {
  const response = await createCustomer(data);
  if (response.statusCode === SUCCESSFUL_REGISTER_CODE) {
    buildCustomerClient(data.email, data.password);
    return { error: '' };
  } else {
    const error = response.error as Error;
    return { error: error.message };
  }
};
