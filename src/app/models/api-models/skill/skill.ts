export class Skill {
  // API fields
  public id: string;
  public languageId: string;
  public name: string;
  public translatedText: SkillTranslatedText;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
    this.translatedText = new SkillTranslatedText(jsonObject.translated_text);
  }
}

export class SkillTranslatedText {
  // API fields
  public languageId: string;
  public name: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
  }
}
