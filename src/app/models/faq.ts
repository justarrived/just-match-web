import {Language} from './language/language';

export class Faq {
  id: number;
  question: string;
  answer: string;
  language: Language;
  translated: Faq;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.question = jsonObject.question;
    this.answer = jsonObject.answer;
    this.language = new Language(jsonObject.language);

    if (!!jsonObject.translated_text) {
      this.translated = new Faq(jsonObject.translated_text);
    }
  }
}
