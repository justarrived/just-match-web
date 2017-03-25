import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface InterestApiAttributes {
  id: string;
  languageId: string;
  language: Language;
  name: string;
  translatedText: InterestTranslatedText;
}

interface InterestTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Interest extends InterestApiAttributes {
}

export interface InterestTranslatedText extends InterestTranslatedTextApiAttributes {
}

// Factories
export class InterestFactory {
  public static createInterest(jsonObject?: any): Interest {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      translatedText: InterestTranslatedTextFactory.createInterestTranslatedText(jsonObject.translated_text),
    };
  }
}

class InterestTranslatedTextFactory {
  public static createInterestTranslatedText(jsonObject?: any): InterestTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
