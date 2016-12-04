import {Language} from './language/language';

export class Faq {
  id: number;
  question: string;
  answer: string;
  language: Language;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.question = jsonObject.question;
    this.answer = jsonObject.answer;
    this.language = new Language(jsonObject.language);
  }
}
