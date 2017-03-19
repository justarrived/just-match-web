export class Faq {
  public id: number;
  public question: string;
  public answer: string;
  public category: string;
  public languageId: string;
  public translated: Faq;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.answer = jsonObject.answer;
    this.category = jsonObject.category;
    this.id = jsonObject.id;
    this.languageId = jsonObject.languageId;
    this.question = jsonObject.question;

    if (jsonObject.translated_text) {
      this.translated = new Faq(jsonObject.translated_text);
    }
  }
}
