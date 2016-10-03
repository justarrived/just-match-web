export class User {
  public email: string;
  public role: string;

  constructor(jsonObject: Object) {
    this.email = jsonObject['email'];
    this.role = jsonObject['primary-role'];
  }

  toJsonObject(): Object {
    return {
      'email': this.email,
      'primary-role': this.role
    };
  }
}
