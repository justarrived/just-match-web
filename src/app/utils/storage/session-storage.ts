import {StorageInterface} from './storage-interface';

export class SessionStorage implements StorageInterface {
  private store: any;

  constructor(
    sessionStore: any
  ) {
    this.store = sessionStore;
  }

  public clear(): void {
    this.store.clear();
  }

  public getItem(key: string) {
    return this.store.getItem(key);
  }

  public setItem(key: string, value: string) {
    this.store.setItem(key, value);
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    sessionStorage.removeItem(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return false;
  }

  public supportsCaching(): boolean {
    return true;
  }
}
