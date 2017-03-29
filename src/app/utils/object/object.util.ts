export function getNestedProperty(obj: any, path: string) {
  try {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  } catch (err) {
    return undefined;
  }
}
