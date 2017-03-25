import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface StatusApiAttributes {
  description: string;
  id: string;
  language: Language;
  languageId: string;
  name: string;
  translatedText: StatusTranslatedText;
}

interface StatusTranslatedTextApiAttributes {
  description: string;
  languageId: string;
  name: string;
}

// Client interfaces
export interface Status extends StatusApiAttributes {
}

export interface StatusTranslatedText extends StatusTranslatedTextApiAttributes {
}

// Factories
export class StatusFactory {
  public static createStatus(jsonObject?: any): Status {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      id: jsonObject.id,
      name: jsonObject.name,
      translatedText: StatusTranslatedTextFactory.createStatusTranslatedText(jsonObject.translated_text),
    };
  }
}

class StatusTranslatedTextFactory {
  public static createStatusTranslatedText(jsonObject?: any): StatusTranslatedText {
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
