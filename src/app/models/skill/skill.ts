export class Skill {
  id: string;
  name: string;
  translated: Skill;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Skill(jsonObject.translated_text);
    }
  }
}
