// API attribute interfaces
interface CategoryApiAttributes {
  id: string;
  name: string;
}

// Client interfaces
export interface Category extends CategoryApiAttributes {
}

// Factories
export class CategoryFactory {
  public static createCategory(jsonObject?: any): Category {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      name: jsonObject.name,
    };
  }
}
