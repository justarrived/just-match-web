export class User {
  public email: string;
  public role: string;

  constructor(jsonObject: any) {
    this.email = jsonObject.email;
    this.role = jsonObject.primary_role;
  }

  toJsonObject(): Object {
    return {
      'email': this.email,
      'primary-role': this.role
    };
  }
}
