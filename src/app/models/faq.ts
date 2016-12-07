import {Language} from './language/language';

export class Faq {
  id: number;
  question: string;
  answer: string;
  language: Language;
  translatedQuestion: string;
  translatedAnswer: string;
  translatedLanguageId: number;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.question = jsonObject.question;
    this.answer = jsonObject.answer;
    this.language = new Language(jsonObject.language);
    this.translatedQuestion = jsonObject.translated_text.question;
    this.translatedAnswer = jsonObject.translated_text.answer;
    this.translatedLanguageId = jsonObject.translated_text.language_id;
  }
}
