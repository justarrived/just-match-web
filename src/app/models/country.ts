export class Country {
  id: string;
  name: string;
  countryCode: string;
  translated: Country;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.countryCode = jsonObject.country_code;

    if (jsonObject.translated_text) {
      this.translated = new Country(jsonObject.translated_text);
    }
  }
}
