export class Faq {
  // API fields
  public answer: string;
  public category: string;
  public id: number;
  public languageId: string;
  public question: string;
  public translatedText: FaqTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.answer = jsonObject.answer;
    this.category = jsonObject.category;
    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.question = jsonObject.question;
    this.translatedText = new FaqTranslatedText(jsonObject.translated_text);
  }
}

export class FaqTranslatedText {
  // API fields
  public answer: string;
  public languageId: string;
  public question: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.answer = jsonObject.answer;
    this.languageId = jsonObject.language_id;
    this.question = jsonObject.question;
  }
}
