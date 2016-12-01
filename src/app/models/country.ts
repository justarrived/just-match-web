export class Country {
  id: string;
  name: string;
  countryCode: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.en_name;
    this.countryCode = jsonObject.country_code;
  }
}
