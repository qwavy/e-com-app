import { createApiClient } from '@shared/api/client/create-api-client';
import { AddressProps } from '@shared/types/customerTypes';

export async function addAddress({ address, version, id }: AddressProps) {
  const api = createApiClient();
  const { streetName, postalCode, city, country } = address;
  const res = await api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName,
              postalCode,
              city,
              country,
            },
          },
        ],
      },
    })
    .execute();
  return res;
}
