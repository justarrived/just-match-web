export class UserStatus {
  id: string;
  name: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.en_name;
  }
}
