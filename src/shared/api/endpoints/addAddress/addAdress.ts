import { createApiClient } from '@shared/api/client/create-api-client';
import { AddressProps } from '@shared/types/customerTypes';

export async function addAddress({ data, version, id = '' }: AddressProps) {
  const api = createApiClient();
  const { streetName, postalCode, city, country } = data;
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
  //const id2 = res.body.addresses[res.body.addresses.length - 1].id;

  return res;
}
