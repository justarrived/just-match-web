export class UserRegister {
  ssn: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  currentStatus: string;
  atUnd: string;
  arrivedAt: string;
  countryOfOrigin: string;
  password: string;
  repeatPassword: string;
  imageToken: string;

  toJsonObject(): Object {
    return {
      'ssn': this.ssn,
      'first-name': this.firstName,
      'last-name': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'current-status': this.currentStatus,
      'at-und': this.atUnd,
      'arrived-at': this.arrivedAt,
      'country-of-origin': this.countryOfOrigin,
      'user-image-one-time-tokens': this.imageToken
    };
  }
}
