import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserStatusApiAttributes {
  description: string;
  id: string;
  language: Language;
  languageId: string;
  name: string;
  translatedText: UserStatusTranslatedText;
}

interface UserStatusTranslatedTextApiAttributes {
  description: string;
  languageId: string;
  name: string;
}

// Client interfaces
export interface UserStatus extends UserStatusApiAttributes {
}

export interface UserStatusTranslatedText extends UserStatusTranslatedTextApiAttributes {
}

// Factories
export class UserStatusFactory {
  public static createUserStatus(jsonObject?: any): UserStatus {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      id: jsonObject.id,
      name: jsonObject.name,
      translatedText: UserStatusTranslatedTextFactory.createUserStatusTranslatedText(jsonObject.translated_text),
    };
  }
}

class UserStatusTranslatedTextFactory {
  public static createUserStatusTranslatedText(jsonObject?: any): UserStatusTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
