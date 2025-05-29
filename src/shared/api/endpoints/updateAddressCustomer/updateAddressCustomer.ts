import { createApiClient } from '@shared/api/client/create-api-client';

export const updateAddressCustomer = async ({ data, userId, addressId, version }) => {
  console.log(data);
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
              country: data.country,
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
