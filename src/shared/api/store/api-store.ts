import { makeAutoObservable } from 'mobx';

import { ApiInstance } from '../api';

class ApiStore {
  api: ApiInstance | null = null;
  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setApi(api: ApiInstance) {
    this.api = api;
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken ?? null;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export const apiStore = new ApiStore();
