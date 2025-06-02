import { createApiClient } from '@shared/api/client/create-api-client';
import { UpdatePersonalInfoCustomerProps } from '@shared/types/customerTypes';

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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
            dateOfBirth: formatDate(data.dateOfBirth),
          },
        ],
      },
    })
    .execute();
  return res;
}
