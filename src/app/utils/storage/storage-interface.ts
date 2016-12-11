export interface StorageInterface {
  clear(): void;
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  removeItem(key: string): string;
  supportsCaching(): boolean;
  persistsRefresh(): boolean;
  persistsSession(): boolean;
}
