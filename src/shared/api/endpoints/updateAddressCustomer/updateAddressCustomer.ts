import { countries } from '@features/registration-user/contracts/countries';
import { createApiClient } from '@shared/api/client/create-api-client';
import { AddressProps } from '@shared/types/customerTypes';

function findCountryCode(countryName: string) {
  return countries.find((c) => c.label === countryName)?.value;
}

export const updateAddressCustomer = async ({ data, userId = '', addressId, version = 1 }: AddressProps) => {
  const country = findCountryCode(data.country) ?? '';
  const api = createApiClient();
  const res = await api
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address: {
              country,
              postalCode: data.postalCode,
              city: data.city,
              streetName: data.streetName,
            },
          },
        ],
      },
    })
    .execute();
  return res;
};
