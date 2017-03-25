import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface SkillApiAttributes {
  id: string;
  language: Language;
  languageId: string;
  name: string;
  translatedText: SkillTranslatedText;
}

interface SkillTranslatedTextApiAttributes {
  languageId: string;
  name: string;
}

// Client interfaces
export interface Skill extends SkillApiAttributes {
}

export interface SkillTranslatedText extends SkillTranslatedTextApiAttributes {
}

// Factories
export class SkillFactory {
  public static createSkill(jsonObject?: any): Skill {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      translatedText: SkillTranslatedTextFactory.createSkillTranslatedText(jsonObject.translated_text),
    };
  }
}

class SkillTranslatedTextFactory {
  public static createSkillTranslatedText(jsonObject?: any): SkillTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      name: jsonObject.name,
    };
  }
}
