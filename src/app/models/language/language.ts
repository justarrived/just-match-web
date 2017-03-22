export class Language {
  // API fields
  public direction: string;
  public id: string;
  public languageCode: string;
  public localName: string;
  public name: string;
  public systemLanguage: boolean;
  public translatedText: LanguageTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.direction = jsonObject.direction;
    this.id = jsonObject.id;
    this.languageCode = jsonObject.lang_code;
    this.localName = jsonObject.local_name;
    this.name = jsonObject.name;
    this.systemLanguage = jsonObject.system_language;
    this.translatedText = new LanguageTranslatedText(jsonObject.translated_text);
  }
}

export class LanguageTranslatedText {
  // API fields
  // TODO check why language_id is missing in API here
  public name: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.name = jsonObject.name;
  }
}
