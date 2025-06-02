import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URL, PROJECT_KEY, scope } from '@shared/constants/constants';
import { RegistrationFields } from '@shared/types/customerTypes';

import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';
import { addAddress } from '../endpoints/addAddress/addAdress';

export const createApiClient = () => {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withClientCredentialsFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};

export async function createCustomer(data: RegistrationFields) {
  const api = createApiClient();

  try {
    const response = await api.customers().post({ body: data }).execute();
    let version = response.body.customer.version;
    const id = response.body.customer.id;

    const shippingAddress = {
      streetName: data.streetName,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      billingAddress: data.billingAddress,
      defaultAddress: data.defaultAddress,
    };
    const billingAddress = {
      streetName: data.billingStreet ?? '',
      postalCode: data.billingPostalCode ?? '',
      city: data.billingCity ?? '',
      country: data.billingCountry ?? '',
      billingAddress: data.billingAddress,
      defaultAddress: data.defaultAddress,
    };

    let customer = await addAddress({ data: shippingAddress, version, id });
    if (!data.billingAddress) {
      version = customer?.body.version ?? 1;
      customer = await addAddress({ data: billingAddress, version, id, isBilling: true });
    }

    return { success: true, data: customer, statusCode: customer?.statusCode };
  } catch (error) {
    return { success: false, error };
  }
}
