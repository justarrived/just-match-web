export class Skill {
  public id: string;
  public name: string;
  public translated: Skill;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;

    if (jsonObject.translated_text) {
      this.translated = new Skill(jsonObject.translated_text);
    }
  }
}
