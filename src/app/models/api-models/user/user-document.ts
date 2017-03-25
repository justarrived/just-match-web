import {Document} from '../document/document';
import {DocumentFactory} from '../document/document';

// API attribute interfaces
interface UserDocumentApiAttributes {
  category: string;
  categoryName: string;
  createdAt: Date;
  document: Document;
  id: string;
}

// Client interfaces
export interface UserDocument extends UserDocumentApiAttributes {
}

// Factories
export class UserDocumentFactory {
  public static createUserDocument(jsonObject?: any): UserDocument {
    if (!jsonObject) {
      return;
    }

    return {
      category: jsonObject.category,
      categoryName: jsonObject.category_name,
      createdAt: new Date(jsonObject.created_at),
      document: DocumentFactory.createDocument(jsonObject.document),
      id: jsonObject.id,
    };
  }
}
