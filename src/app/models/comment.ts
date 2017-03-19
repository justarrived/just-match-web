import {User} from './user';

export class Comment {
  public body: string;
  public commentableId: number;
  public commentableType: string;
  public createdAt: number;
  public id: number;
  public languageId: string;
  public owner: User;
  public translated: Comment;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.body = jsonObject.body;
    this.commentableId = jsonObject.commentable_id;
    this.commentableType = jsonObject.commentable_type;
    this.createdAt = jsonObject.created_at;
    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.owner = new User(jsonObject.owner);

    if (jsonObject.translated_text) {
      this.translated = new Comment(jsonObject.translated_text);
    }
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
