import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface JobDigestNotificationFrequencyApiAttributes {
  description: string;
  id: string;
  key: string;
  language: Language;
  languageId: string;
  name: string;
  translatedText: JobDigestNotificationFrequencyTranslatedText;
}

interface JobDigestNotificationFrequencyTranslatedTextApiAttributes {
  description: string;
  languageId: string;
  name: string;
}

// Client interfaces
export interface JobDigestNotificationFrequency extends JobDigestNotificationFrequencyApiAttributes {
}

export interface JobDigestNotificationFrequencyTranslatedText extends JobDigestNotificationFrequencyTranslatedTextApiAttributes {
}

// Factories
export class JobDigestNotificationFrequencyFactory {
  public static createJobDigestNotificationFrequency(jsonObject?: any): JobDigestNotificationFrequency {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      language: LanguageFactory.createLanguage(jsonObject.language),
      key: jsonObject.key,
      languageId: jsonObject.language_id,
      id: jsonObject.id,
      name: jsonObject.name,
      translatedText: JobDigestNotificationFrequencyTranslatedTextFactory.createJobDigestNotificationFrequencyTranslatedText(jsonObject.translated_text),
    };
  }
}

class JobDigestNotificationFrequencyTranslatedTextFactory {
  public static createJobDigestNotificationFrequencyTranslatedText(jsonObject?: any): JobDigestNotificationFrequencyTranslatedText {
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
