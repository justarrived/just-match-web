import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface CountryApiAttributes {
  countryCode: string;
  id: string;
  languageId: string;
  language: Language;
  localName: string;
  name: string;
  translatedText: CountryTranslatedText;
}

interface CountryTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Country extends CountryApiAttributes {
}

export interface CountryTranslatedText extends CountryTranslatedTextApiAttributes {
}

// Factories
export class CountryFactory {
  public static createCountry(jsonObject?: any): Country {
    if (!jsonObject) {
      return;
    }

    return {
      countryCode: jsonObject.country_code,
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      localName: jsonObject.local_name,
      name: jsonObject.name,
      translatedText: CountryTranslatedTextFactory.createCountryTranslatedText(jsonObject.translated_text),
    };
  }
}

class CountryTranslatedTextFactory {
  public static createCountryTranslatedText(jsonObject?: any): CountryTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
