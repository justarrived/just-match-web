export interface StorageInterface {
  clear(): void;
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  removeItem(key: string): string;
  isCachable(): boolean;
  persistsRefresh(): boolean;
  persistsSession(): boolean;
}
