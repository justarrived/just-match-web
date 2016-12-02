export function storageTypeAvailable(type): boolean {
  try {
    const storage: any = window[type];
    const value: string = '__storage_test__';

    storage.setItem(value, value);
    storage.removeItem(value);

    return true;
  } catch (e) {
    return false;
  }
}
