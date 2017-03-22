import {Language} from '../language/language';
import {User} from '../user/user';

export class Comment {
  // API fields
  public body: string;
  public bodyHtml: string;
  public commentableId: number;
  public commentableType: string;
  public createdAt: number;
  public id: number;
  public languageId: string;
  public owner: User;
  public translatedText: CommentTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.body = jsonObject.body;
    this.bodyHtml = jsonObject.body_html;
    this.commentableId = jsonObject.commentable_id;
    this.commentableType = jsonObject.commentable_type;
    this.createdAt = jsonObject.created_at;
    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.owner = new User(jsonObject.owner);
    this.translatedText = new CommentTranslatedText(jsonObject.translated_text);
  }
}

export class CommentTranslatedText {
  // API fields
  public body: string;
  public bodyHtml: string;
  public languageId: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.body = jsonObject.body;
    this.bodyHtml = jsonObject.body_html;
    this.languageId = jsonObject.language_id;
  }
}
