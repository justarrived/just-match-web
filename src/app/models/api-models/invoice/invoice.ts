export class Invoice {
  // API fields
  public id: number;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
  }
}
