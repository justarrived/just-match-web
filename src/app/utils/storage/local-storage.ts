import {StorageInterface} from './storage-interface';

export class LocalStorage implements StorageInterface {
  private store: any;

  constructor(store: any) {
    this.store = store;
  }

  clear(): void {
    this.store.clear();
  }

  setItem(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  getItem(key: string): string {
    return this.store.getItem(key);
  }

  removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.store.removeItem(key);

    return oldValue;
  }

  persistsRefresh(): boolean {
    return true;
  }

  persistsSession(): boolean {
    return true;
  }

  isCachable(): boolean {
    return true;
  }
}
