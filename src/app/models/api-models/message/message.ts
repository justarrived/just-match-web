import {Chat} from '../chat/chat';
import {ChatFactory} from '../chat/chat';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface MessageApiAttributes {
  author: User;
  body: string;
  bodyHtml: string;
  chat: Chat;
  createdAt: Date;
  id: string;
  language: Language;
  languageId: string;
  translatedText: MessageTranslatedText;
}

interface MessageTranslatedTextApiAttributes {
  body: string;
  bodyHtml: string;
  languageId: string;
}

// Client interfaces
export interface Message extends MessageApiAttributes {
}

export interface MessageTranslatedText extends MessageTranslatedTextApiAttributes {
}

// Factories
export class MessageFactory {
  public static createMessage(jsonObject?: any): Message {
    if (!jsonObject) {
      return;
    }

    return {
      author: UserFactory.createUser(jsonObject.author),
      body: jsonObject.body,
      bodyHtml: jsonObject.body_html,
      chat: ChatFactory.createChat(jsonObject.chat),
      createdAt: new Date(jsonObject.created_at),
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      translatedText: MessageTranslatedTextFactory.createMessageTranslatedText(jsonObject.translated_text),
    };
  }
}

class MessageTranslatedTextFactory {
  public static createMessageTranslatedText(jsonObject?: any): MessageTranslatedText {
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
