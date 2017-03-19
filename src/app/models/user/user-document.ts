import {Document} from '../document';

export class UserDocument {
  public category: string;
  public createdAt: Date;
  public document: Document;
  public id: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.category = jsonObject.category;
    this.createdAt = new Date(jsonObject.created_at);
    this.document = new Document(jsonObject.document);
    this.id = jsonObject.id;
  }
}
