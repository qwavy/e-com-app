import { Customer } from '@commercetools/platform-sdk';
import { restoreSession } from '@shared/api/client/restore-session';
import { makeAutoObservable } from 'mobx';

class UserStore {
  user: Customer | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(customer: Customer) {
    console.log(customer);
    this.user = customer;
  }

  clearUser() {
    this.user = null;
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  get fullName(): string {
    return this.user ? `${this.user.firstName ?? ''} ${this.user.lastName ?? ''}`.trim() : '';
  }

  isInitialized = false;

  async restoreSession() {
    try {
      const result = await restoreSession();
      if (result) {
        this.user = result.customer;
      } else {
        this.user = null;
      }
    } catch {
      this.user = null;
    } finally {
      this.isInitialized = true;
    }
  }
}

export const userStore = new UserStore();
