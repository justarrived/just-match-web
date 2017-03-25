import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface GenderApiAttributes {
  id: string;
  name: string;
  language: Language;
  languageId: string;
  translatedText: GenderTranslatedText;
}

interface GenderTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Gender extends GenderApiAttributes {
}

export interface GenderTranslatedText extends GenderTranslatedTextApiAttributes {
}

// Factories
export class GenderFactory {
  public static createGender(jsonObject?: any): Gender {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      name: jsonObject.name,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      translatedText: GenderTranslatedTextFactory.createGenderTranslatedText(jsonObject.translated_text),
    };
  }
}

class GenderTranslatedTextFactory {
  public static createGenderTranslatedText(jsonObject?: any): GenderTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
