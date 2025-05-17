import { RegistrationFields } from '@features/registration-user/ui/registration-form';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URI, PROJECT_KEY, scope } from '@shared/constants/constants';
const createApiClient = () => {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withClientCredentialsFlow({
      host: OAUTH_URI,
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
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
    throw new Error('Failed to create customer: Unknown error');
  }
}
