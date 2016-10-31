export class Language {
  id: number;
  name: string;
  code: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.en_name;
    this.code = jsonObject.lang_code;
  }
}
