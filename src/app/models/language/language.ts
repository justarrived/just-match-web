export class Language {
  id: string;
  direction: string;
  languageCode: string;
  name: string;
  localName: string;
  translated: Language;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.direction = jsonObject.direction;
    this.languageCode = jsonObject.lang_code;
    this.name = jsonObject.name;
    this.localName = jsonObject.local_name;

    if (jsonObject.translated_text) {
      this.translated = new Language(jsonObject.translated_text);
    }
  }
}
