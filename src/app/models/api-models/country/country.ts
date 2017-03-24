export class Country {
  // API fields
  public countryCode: string;
  public id: string;
  public languageId: string;
  public localName: string;
  public name: string;
  public translatedText: CountryTranslatedText;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.countryCode = jsonObject.country_code;
    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.localName = jsonObject.local_name;
    this.name = jsonObject.name;
    this.translatedText = new CountryTranslatedText(jsonObject.translated_text);
  }
}

export class CountryTranslatedText {
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
