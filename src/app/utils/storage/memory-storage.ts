import {StorageInterface} from './storage-interface';

export class MemoryStorage implements StorageInterface {
  private items: Object = {};

  clear(): void {
    this.items = {};
  }

  setItem(key: string, value: string): void {
    this.items[key] = value;
  }

  getItem(key: string): string {
    return this.items[key];
  }

  removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.setItem(key, null);

    return oldValue;
  }

  persistsRefresh(): boolean {
    return false;
  }

  persistsSession(): boolean {
    return false;
  }

  isCachable(): boolean {
    return true;
  }
}
