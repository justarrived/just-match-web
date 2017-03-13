export class Interest {
  id: string;
  name: string;
  translated: Interest;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Interest(jsonObject.translated_text);
    }
  }
}
