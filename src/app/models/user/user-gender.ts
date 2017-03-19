export class UserGender {
  public id: string;
  public name: string;
  public translated: UserGender;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new UserGender(jsonObject.translated_text);
    }
  }
}
