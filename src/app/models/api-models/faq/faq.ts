import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// API attribute interfaces
interface FaqApiAttributes {
  answer: string;
  category: string;
  id: number;
  language: Language;
  languageId: string;
  question: string;
  translatedText: FaqTranslatedText;
}

interface FaqTranslatedTextApiAttributes {
  answer: string;
  languageId: string;
  question: string;
}

// Client interfaces
export interface Faq extends FaqApiAttributes {
}

export interface FaqTranslatedText extends FaqTranslatedTextApiAttributes {
}

// Factories
export class FaqFactory {
  public static createFaq(jsonObject?: any): Faq {
    if (!jsonObject) {
      return;
    }

    return {
      answer: jsonObject.answer,
      category: jsonObject.category,
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      question: jsonObject.question,
      translatedText: FaqTranslatedTextFactory.createFaqTranslatedText(jsonObject.translated_text),
    };
  }
}

class FaqTranslatedTextFactory {
  public static createFaqTranslatedText(jsonObject?: any): FaqTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      answer: jsonObject.answer,
      languageId: jsonObject.language_id,
      question: jsonObject.question,
    };
  }
}
