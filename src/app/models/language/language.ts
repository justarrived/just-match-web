export class Language {
  public direction: string;
  public id: string;
  public languageCode: string;
  public localName: string;
  public name: string;
  public translated: Language;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.direction = jsonObject.direction;
    this.id = jsonObject.id;
    this.languageCode = jsonObject.lang_code;
    this.localName = jsonObject.local_name;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Language(jsonObject.translated_text);
    }
  }
}
