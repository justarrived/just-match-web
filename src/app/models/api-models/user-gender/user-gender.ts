import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserGenderApiAttributes {
  id: string;
  name: string;
  language: Language; // TODO missing relation in docs?
  languageId: string; // TODO missing in docs?
  translatedText: UserGenderTranslatedText;
}

interface UserGenderTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface UserGender extends UserGenderApiAttributes {
}

export interface UserGenderTranslatedText extends UserGenderTranslatedTextApiAttributes {
}

// Factories
export class UserGenderFactory {
  public static createUserGender(jsonObject?: any): UserGender {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      name: jsonObject.name,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      translatedText: UserGenderTranslatedTextFactory.createUserGenderTranslatedText(jsonObject.translated_text),
    };
  }
}

class UserGenderTranslatedTextFactory {
  public static createUserGenderTranslatedText(jsonObject?: any): UserGenderTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
