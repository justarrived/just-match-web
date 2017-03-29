import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserLanguageApiAttributes {
  id: string;
  language: Language;
  proficiency: number;
  user: User;
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
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
