import {Document} from '../document/document';

export class UserDocument {
  // API fields
  public category: string;
  public categoryName: string;
  public createdAt: Date;
  public document: Document;
  public id: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.category = jsonObject.category;
    this.categoryName = jsonObject.category_name;
    this.createdAt = new Date(jsonObject.created_at);
    this.document = new Document(jsonObject.document);
    this.id = jsonObject.id;
  }
}
