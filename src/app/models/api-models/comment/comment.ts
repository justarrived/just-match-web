import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface CommentApiAttributes {
  body: string;
  bodyHtml: string;
  commentableId: number;
  commentableType: string;
  createdAt: Date;
  id: number;
  language: Language;
  languageId: string;
  owner: User;
  translatedText: CommentTranslatedText;
}

interface CommentTranslatedTextApiAttributes {
  body: string;
  bodyHtml: string;
  languageId: string;
}

// Client interfaces
export interface Comment extends CommentApiAttributes {
}

export interface CommentTranslatedText extends CommentTranslatedTextApiAttributes {
}

// Factories
export class CommentFactory {
  public static createComment(jsonObject?: any): Comment {
    if (!jsonObject) {
      return;
    }

    return {
      body: jsonObject.body,
      bodyHtml: jsonObject.body_html,
      commentableId: jsonObject.commentable_id,
      commentableType: jsonObject.commentable_type,
      createdAt: new Date(jsonObject.created_at),
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      owner: UserFactory.createUser(jsonObject.owner),
      translatedText: CommentTranslatedTextFactory.createCommentTranslatedText(jsonObject.translated_text),
    };
  }
}

class CommentTranslatedTextFactory {
  public static createCommentTranslatedText(jsonObject?: any): CommentTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      body: jsonObject.body,
      bodyHtml: jsonObject.body_html,
      languageId: jsonObject.language_id,
    };
  }
}
