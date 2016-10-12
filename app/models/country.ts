export class Country {
  id: string;
  name: string;
  countryCode: string;

  constructor(jsonObject: Object) {
    this.id = jsonObject['id'];
    this.name = jsonObject['en-name'];
    this.countryCode = jsonObject['country-code'];
  }
}
