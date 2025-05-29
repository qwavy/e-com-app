import { userStore } from '@entities/user/model/user-store';
//import { buildCustomerClient } from '@shared/api/client/build-customer-client';

import { addAddress } from '@shared/api/endpoints/addAddress/addAdress';
//import { createCustomer } from '@shared/api/client/create-api-client';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';

export const addAddressAction = async ({ data, id, version }) => {
  try {
    const response = await addAddress({ address: data, id, version });

    if (response.statusCode === SUCCESSFUL_RESPONSE_CODE) {
      //const customerClient = await buildCustomerClient({ email: data.email, password: data.password });
      //userStore.setUser(customerClient.customer);
      const customer = response.body;
      userStore.setUser(customer);
      return { error: '', customer };
    } else {
      const error = response.error;
      return { error: error.message };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unexpected error';
    return { error };
  }
};
