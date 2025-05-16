import { RegistrationFields } from '@features/session/registration/ui/Registration-form';
import { addDefaultAddress } from '../addDefaultAddress/addDefaultAdress';
import { api } from '@shared/api/api';

export async function createCustomer(data: RegistrationFields) {
  try {
    const response = await api.customers().post({ body: data }).execute();
    const version = response.body.customer.version;
    const id = response.body.customer.id;
    if (data.defaultAddress) {
      await addDefaultAddress({ data, version, id });
    }
    return { success: true, data: response, statusCode: response.statusCode };
  } catch (error) {
    return { success: false, error: error };
  }
}
