export class Gender {
  // API fields
  public id: string;
  public name: string;
  public languageId: string;
  public translatedText: GenderTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.languageId = jsonObject.language_id;
    this.translatedText = new GenderTranslatedText(jsonObject.translated_text);
  }
}

export class GenderTranslatedText {
  // API fields
  public name: string;
  public languageId: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.name = jsonObject.name;
    this.languageId = jsonObject.language_id;
  }
}
