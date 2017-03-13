export class UserGender {
  id: string;
  name: string;
  translated: UserGender;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new UserGender(jsonObject.translated_text);
    }
  }
}
