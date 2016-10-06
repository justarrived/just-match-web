export class UserStatus {
  name: string;
  description: string;

  constructor(jsonObject: Object) {
    this.name = jsonObject['en-name'];
    this.description = jsonObject['en-description'];
  }
}
