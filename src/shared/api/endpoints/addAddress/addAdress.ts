import { createApiClient } from '@shared/api/client/create-api-client';

interface Props {
  address: Address;
  version: number;
  id: string;
}

interface Address {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export async function addAddress({ address, version, id }: Props) {
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
