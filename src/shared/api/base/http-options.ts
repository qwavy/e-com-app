import { BASE_URI } from '@shared/constants/constants';

export const httpOptions = {
  host: BASE_URI,
  httpClient: fetch,
};
