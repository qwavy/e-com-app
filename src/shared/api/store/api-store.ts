import { makeAutoObservable } from 'mobx';

import { ApiInstance } from '../api';

class ApiStore {
  api: ApiInstance | null = null;
  accessToken: string | null = null;
  refreshToken: string | null = null;
  anonymousId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setApi(api: ApiInstance) {
    this.api = api;
  }

  get apiClient() {
    return this.api?.api ?? null;
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken ?? null;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  setAnonymousId(id: string) {
    this.anonymousId = id;
    localStorage.setItem('anonymous_id', id);
  }

  getAnonymousId(): string {
    if (this.anonymousId) {
      return this.anonymousId;
    }

    const saved = localStorage.getItem('anonymous_id');
    if (saved) {
      this.anonymousId = saved;
      return saved;
    }

    const newId = crypto.randomUUID();
    this.setAnonymousId(newId);
    return newId;
  }

  clearAnonymousId() {
    this.anonymousId = null;
  }
}

export const apiStore = new ApiStore();
