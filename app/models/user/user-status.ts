export class UserStatus {
  id: string;
  name: string;

  constructor(jsonObject: Object) {
    this.id = jsonObject['id'];
    this.name = jsonObject['en-name'];
  }
}
