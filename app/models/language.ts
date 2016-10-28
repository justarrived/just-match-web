export class Language {
  id: string;
  direction: string;
  languageCode: string;
  localName: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.direction = jsonObject.direction;
    this.languageCode = jsonObject.lang_code;
    this.localName = jsonObject.local_name;
  }
}
