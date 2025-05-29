import { createApiClient } from '@shared/api/client/create-api-client';
import { UpdatePersonalInfoCustomerProps } from '@shared/types/customerTypes';

export async function updatePersonalInfoCustomer({ data, id, version }: UpdatePersonalInfoCustomerProps) {
  const api = createApiClient();
  const res = await api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeEmail',
            email: data.email,
          },
          {
            action: 'setFirstName',
            firstName: data.firstName,
          },
          {
            action: 'setLastName',
            lastName: data.lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: '1990-05-05',
          },
        ],
      },
    })
    .execute();
  return res;
}
