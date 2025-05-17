import { RegistrationFields } from '../ui/registration-form';
import { SUCCESSFUL_REGISTER_CODE } from '@shared/constants/constants';
import { buildCustomerClient } from '@shared/api/client/build-customer-client';
import { createCustomer } from '@shared/api/client/create-api-client';

interface Error {
  message: string;
}

export const registerAction = async (data: RegistrationFields) => {
  try {
    const response = await createCustomer(data);
    console.log(response);

    if (response.statusCode === SUCCESSFUL_REGISTER_CODE) {
      const customerClient = await buildCustomerClient(data.email, data.password);
      console.log(customerClient);
      return { error: '', ...customerClient };
    } else {
      const error = response.body as unknown as Error;
      return { error: error.message };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unexpected error';
    return { error };
  }
};
