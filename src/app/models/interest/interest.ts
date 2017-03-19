export class Interest {
  public id: string;
  public name: string;
  public translated: Interest;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Interest(jsonObject.translated_text);
    }
  }
}
