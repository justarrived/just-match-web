import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface UserLanguageApiAttributes {
  id: number;
  language: Language;
  proficiency: number;
}

// Client interfaces
export interface UserLanguage extends UserLanguageApiAttributes {
}

// Factories
export class UserLanguageFactory {
  public static createUserLanguage(jsonObject?: any): UserLanguage {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      proficiency: jsonObject.proficiency,
    };
  }
}
