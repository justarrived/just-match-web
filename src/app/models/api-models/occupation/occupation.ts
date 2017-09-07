import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface OccupationApiAttributes {
  createdAt: Date;
  id: string;
  language: Language;
  languageId: string;
  name: string
  parent: Occupation;
  translatedText: OccupationTranslatedText;
  updatedAt: Date;
}

interface OccupationTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Occupation extends OccupationApiAttributes {
}

export interface OccupationTranslatedText extends OccupationTranslatedTextApiAttributes {
}

// Factories
export class OccupationFactory {
  public static createOccupation(jsonObject?: any): Occupation {
    if (!jsonObject) {
      return;
    }

    return {
      createdAt: new Date(jsonObject.created_at),
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      translatedText: OccupationTranslatedTextFactory.createOccupationTranslatedText(jsonObject.translated_text),
      parent: OccupationFactory.createOccupation(jsonObject.parent),
      updatedAt: new Date(jsonObject.updated_at),
    };
  }
}

class OccupationTranslatedTextFactory {
  public static createOccupationTranslatedText(jsonObject?: any): OccupationTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
