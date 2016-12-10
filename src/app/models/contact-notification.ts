export class ContactNotification {
  name: string;
  email: string;
  body: string;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.name = jsonObject.name;
    this.email = jsonObject.email;
    this.body = jsonObject.body;
  }

  toJsonObject(): Object {
    return {
      'name': this.name,
      'email': this.email,
      'body': this.body
    };
  }
}
