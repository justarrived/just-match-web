import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserIgnoredNotificationsApiAttributes {
  id: string;
  description: string;
  language: Language;
  languageId: string;
  translatedText: UserIgnoredNotificationsTranslatedText;
}

interface UserIgnoredNotificationsTranslatedTextApiAttributes {
  languageId: string;
  description: string;
}

// Client interfaces
export interface UserIgnoredNotifications extends UserIgnoredNotificationsApiAttributes {
}

export interface UserIgnoredNotificationsTranslatedText extends UserIgnoredNotificationsTranslatedTextApiAttributes {
}

// Factories
export class UserIgnoredNotificationsFactory {
  public static createUserIgnoredNotifications(jsonObject?: any): UserIgnoredNotifications {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      description: jsonObject.description,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      translatedText: UserIgnoredNotificationsTranslatedTextFactory.createUserIgnoredNotificationsTranslatedText(jsonObject.translated_text),
    };
  }
}

class UserIgnoredNotificationsTranslatedTextFactory {
  public static createUserIgnoredNotificationsTranslatedText(jsonObject?: any): UserIgnoredNotificationsTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      description: jsonObject.description,
    };
  }
}
