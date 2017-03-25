// API attribute interfaces
interface LanguageApiAttributes {
  direction: string;
  id: string;
  languageCode: string;
  languageId: string;
  localName: string;
  name: string;
  systemLanguage: boolean;
  translatedText: LanguageTranslatedText;
}

interface LanguageTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Language extends LanguageApiAttributes {
}

export interface LanguageTranslatedText extends LanguageTranslatedTextApiAttributes {
}

// Factories
export class LanguageFactory {
  public static createLanguage(jsonObject?: any): Language {
    if (!jsonObject) {
      return;
    }

    return {
      direction: jsonObject.direction,
      id: jsonObject.id,
      languageCode: jsonObject.lang_code,
      languageId: jsonObject.language_id,
      localName: jsonObject.local_name,
      name: jsonObject.name,
      systemLanguage: jsonObject.system_language,
      translatedText: LanguageTranslatedTextFactory.createLanguageTranslatedText(jsonObject.translated_text),
    };
  }
}

class LanguageTranslatedTextFactory {
  public static createLanguageTranslatedText(jsonObject?: any): LanguageTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
