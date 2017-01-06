export class ServerValidationErrors {

  constructor(jsonObject?: any) {
    if (jsonObject) {
      for (var error of jsonObject.attributes) {
        this[error.attribute] = error.detail;
      }
    }
  }
}
