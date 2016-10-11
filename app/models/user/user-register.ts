export class UserRegister {
  ssn: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  languageId: number;
  currentStatus: string;
  atUndStatus: any;
  arrivedAt: string;
  countryOfOrigin: string;
  password: string;
  repeatPassword: string;
  imageToken: string;
  acceptedTermsAndConditions: boolean;

  toJsonObject(): Object {
    return {
      'ssn': this.ssn,
      'first_name': this.firstName,
      'last_name': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'language_id': this.languageId,
      'current_status': this.currentStatus,
      'at_und': this.atUndStatus.value,
      'arrived_at': this.arrivedAt,
      'country_of_origin': this.countryOfOrigin,
      'password': this.password,
      'user_image_one_time_tokens': [this.imageToken]
    };
  }
}
