import {Language} from './language/language';

export class Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
  languageId: string;
  translated: Faq;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.question = jsonObject.question;
    this.answer = jsonObject.answer;
    this.category = jsonObject.category;
    this.languageId = jsonObject.languageId;

    if (!!jsonObject.translated_text) {
      this.translated = new Faq(jsonObject.translated_text);
    }
  }
}
