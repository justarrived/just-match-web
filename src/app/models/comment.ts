import {User} from './user';

export class Comment {
  id: number;
  body: string;
  commentableId: number;
  commentableType: string;
  createdAt: number;
  languageId: string;
  owner: User;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.body = jsonObject.body;
    this.commentableId = jsonObject.commentable_id;
    this.commentableType = jsonObject.commentable_type;
    this.createdAt = jsonObject.created_at;
    this.languageId = jsonObject.language_id;
    this.owner = new User(jsonObject.owner);
  }

  public toJsonObject() {
    return {
      commentable_id: this.commentableId,
      commentable_type: this.commentableType,
      language_id: this.languageId,
      body: this.body
    };
  }
}
