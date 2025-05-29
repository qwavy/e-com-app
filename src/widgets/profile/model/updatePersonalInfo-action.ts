import { userStore } from '@entities/user/model/user-store';
//import { buildCustomerClient } from '@shared/api/client/build-customer-client';
// eslint-disable-next-line max-len
import { updatePersonalInfoCustomer } from '@shared/api/endpoints/updatePersonalInfoCustomer/updatePersonalInfoCustomer';
//import { createCustomer } from '@shared/api/client/create-api-client';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { UpdatePersonalInfoCustomerProps } from '@shared/types/customerTypes';

export const updatePersonalInfoAction = async ({ data, id, version }: UpdatePersonalInfoCustomerProps) => {
  try {
    const response = await updatePersonalInfoCustomer({ data, id, version });

    if (response.statusCode === SUCCESSFUL_RESPONSE_CODE) {
      //const customerClient = await buildCustomerClient({ email: data.email, password: data.password });
      //userStore.setUser(customerClient.customer);
      const customer = response.body;
      userStore.setUser(customer);
      return { error: '', customer };
    } else {
      const error = response.error as Error;
      return { error: error.message };
    }
  } catch (e) {
    console.log(e, 'updateAction');
    const error = e instanceof Error ? e.message : 'Unexpected error';
    return { error };
  }
};
