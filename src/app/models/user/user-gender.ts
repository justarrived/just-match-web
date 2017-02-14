export class UserGender {
  id: string;
  name: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;
  }
}
