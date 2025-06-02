import { countries } from '@features/registration-user/contracts/countries';
import { createApiClient } from '@shared/api/client/create-api-client';
import { AddressProps } from '@shared/types/customerTypes';

import { Action } from '../addAddress/addAdress';
import { setAddressParams } from '../setAddressParams/setAddressParams';

function findCountryCode(countryName: string) {
  return countries.find((c) => c.label === countryName)?.value;
}

export const updateAddressCustomer = async ({ data, userId = '', addressId, version = 1 }: AddressProps) => {
  const countryCode = data.country.length > 2 ? findCountryCode(data.country) : data.country;
  const country = countryCode ?? '';
  const api = createApiClient();
  let res = await api
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

  if (data.defaultAddress) {
    res = await setAddressParams({
      addressId: addressId ?? '',
      version,
      id: userId,
      action: Action.setDefaultShippingAddress,
    });
  }

  return res;
};
