export class Status {
  // API fields
  public description: string;
  public id: string;
  public languageId: string;
  public name: string;
  public translatedText: StatusTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.description = jsonObject.description;
    this.languageId = jsonObject.language_id;
    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.translatedText = new StatusTranslatedText(jsonObject.translated_text);
  }
}

export class StatusTranslatedText {
  // API fields
  public description: string;
  public languageId: string;
  public name: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.description = jsonObject.description;
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
  }
}
