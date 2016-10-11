export class UserRegister {
  ssn: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  languageId: number;
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
      'first_name': this.firstName,
      'last_name': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'language_id': this.languageId,
      'current_status': this.currentStatus,
      'at_und': this.atUnd,
      'arrived_at': this.arrivedAt,
      'country_of_origin': this.countryOfOrigin,
      'password': this.password,
      'user_image_one_time_tokens': [this.imageToken]
    };
  }
}
