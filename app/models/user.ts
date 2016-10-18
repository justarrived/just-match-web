export class User {
  public email: string;
  public role: string;
  public firstName: string;
  public lastName: string;

  constructor(jsonObject: any) {
    this.email = jsonObject.email;
    this.role = jsonObject.primary_role;
    this.firstName = jsonObject.first_name;
    this.lastName = jsonObject.last_name;
  }

  toJsonObject(): Object {
    return {
      'email': this.email,
      'primary-role': this.role
    };
  }
}
