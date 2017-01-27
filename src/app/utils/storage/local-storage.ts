import {StorageInterface} from './storage-interface';

export class LocalStorage implements StorageInterface {
  private store: any;

  constructor(
    store: any
  ) {
    this.store = store;
  }

  public clear(): void {
    this.store.clear();
  }

  public setItem(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  public getItem(key: string): string {
    return this.store.getItem(key);
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.store.removeItem(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return true;
  }

  public supportsCaching(): boolean {
    return true;
  }
}
