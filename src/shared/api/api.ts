import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
export interface ApiInstance {
  api: ByProjectKeyRequestBuilder;
  accessToken: string;
  refreshToken?: string;
}

export let api: ApiInstance | null = null;

export function setApi(newApi: ApiInstance) {
  api = newApi;
}
