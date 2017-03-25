import {StorageInterface} from './storage-interface';

export class MemoryStorage implements StorageInterface {
  private items: any = {};

  public clear(): void {
    this.items = {};
  }

  public setItem(key: string, value: string): void {
    this.items[key] = value;
  }

  public getItem(key: string): string {
    return this.items[key];
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.setItem(key, null);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return false;
  }

  public persistsSession(): boolean {
    return false;
  }

  public supportsCaching(): boolean {
    return true;
  }
}
