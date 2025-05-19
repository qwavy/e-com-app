import { ClientBuilder } from '@commercetools/ts-client';

import { httpOptions } from './http-options';

export function createClientBuilder() {
  return new ClientBuilder().withHttpMiddleware(httpOptions);
}
