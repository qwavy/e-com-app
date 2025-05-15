import { RegistrationFields } from '@features/session/registration/ui/Registration-form';
import { api } from '@shared/api/api';

export async function createCustomer(data: RegistrationFields) {
  try {
    const response = await api.customers().post({ body: data }).execute();
    return { success: true, data: response, statusCode: response.statusCode };
  } catch (error) {
    return { success: false, error: error };
  }
}
