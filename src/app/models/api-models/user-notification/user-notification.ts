import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserNotificationApiAttributes {
  id: string;
  description: string;
  language: Language;
  languageId: string;
  translatedText: UserNotificationTranslatedText;
}

interface UserNotificationTranslatedTextApiAttributes {
  languageId: string;
  description: string;
}

// Client interfaces
export interface UserNotification extends UserNotificationApiAttributes {
}

export interface UserNotificationTranslatedText extends UserNotificationTranslatedTextApiAttributes {
}

// Factories
export class UserNotificationFactory {
  public static createUserNotification(jsonObject?: any): UserNotification {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      description: jsonObject.description,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      translatedText: UserNotificationTranslatedTextFactory.createUserNotificationTranslatedText(jsonObject.translated_text),
    };
  }
}

class UserNotificationTranslatedTextFactory {
  public static createUserNotificationTranslatedText(jsonObject?: any): UserNotificationTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      description: jsonObject.description,
    };
  }
}
