export class Country {
  public countryCode: string;
  public id: string;
  public name: string;
  public translated: Country;

  public constructor(jsonObject: any) {
    this.countryCode = jsonObject.country_code;
    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Country(jsonObject.translated_text);
    }
  }
}
