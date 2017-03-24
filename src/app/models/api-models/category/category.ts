export class Category {
  // API fields
  public id: string;
  public name: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;
  }
}
