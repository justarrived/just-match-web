export class Interest {
  // API fields
  public id: string;
  public languageId: string;
  public name: string;
  public translatedText: InterestTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
    this.translatedText = new InterestTranslatedText(jsonObject.translated_text);
  }
}

export class InterestTranslatedText {
  // API fields
  public languageId: string;
  public name: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
  }
}
