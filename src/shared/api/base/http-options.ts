import { BASE_URL } from '@shared/constants/constants';

export const httpOptions = {
  host: BASE_URL,
  httpClient: fetch,
};
