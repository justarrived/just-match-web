import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserImageCategoryApiAttributes {
  description: string;
  id: string;
  language: Language; // TODO missing relation in docs?
  languageId: string;
  name: string;
  translatedText: UserImageCategoryTranslatedText;
}

interface UserImageCategoryTranslatedTextApiAttributes {
  description: string;
  languageId: string;
  name: string;
}

// Client interfaces
export interface UserImageCategory extends UserImageCategoryApiAttributes {
}

export interface UserImageCategoryTranslatedText extends UserImageCategoryTranslatedTextApiAttributes {
}

// Factories
export class UserImageCategoryFactory {
  public static createUserImageCategory(jsonObject?: any): UserImageCategory {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      translatedText: UserImageCategoryTranslatedTextFactory.createUserImageCategoryTranslatedText(jsonObject.translated_text),
    };
  }
}

class UserImageCategoryTranslatedTextFactory {
  public static createUserImageCategoryTranslatedText(jsonObject?: any): UserImageCategoryTranslatedText {
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
