import {StorageInterface} from './storage-interface';

export class SessionStorage implements StorageInterface {
  private store: any;

  constructor(sessionStore: any) {
    this.store = sessionStore;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.getItem(key);
  }

  setItem(key: string, value: string) {
    this.store.setItem(key, value);
  }

  removeItem(key: string): string {
    const oldValue = this.getItem(key);
    sessionStorage.removeItem(key);

    return oldValue;
  }

  persistsRefresh(): boolean {
    return true;
  }

  persistsSession(): boolean {
    return false;
  }

  isCachable(): boolean {
    return true;
  }
}
