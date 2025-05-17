import { api } from '@shared/api/api';

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

export function addAddress({ address, version, id }: Props) {
  const { streetName, postalCode, city, country } = address;
  return api
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
}
