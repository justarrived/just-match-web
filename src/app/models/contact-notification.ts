export class ContactNotification {
  public body: string;
  public email: string;
  public name: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.body = jsonObject.body;
    this.email = jsonObject.email;
    this.name = jsonObject.name;
  }

  toJsonObject(): Object {
    return {
      'body': this.body,
      'email': this.email,
      'name': this.name
    };
  }
}
