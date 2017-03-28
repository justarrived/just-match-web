import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface TermsAgreementApiAttributes {
  id: string;
  url: string;
  version: string;
}

// Client interfaces
export interface TermsAgreement extends TermsAgreementApiAttributes {
}

// Factories
export class TermsAgreementFactory {
  public static createTermsAgreement(jsonObject?: any): TermsAgreement {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      url: jsonObject.url,
      version: jsonObject.version,
    };
  }
}
