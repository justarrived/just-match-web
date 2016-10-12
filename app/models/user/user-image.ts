export class UserImage {
  oneTimeToken: string;
  imageUrl: string;

  constructor(jsonObject: Object) {
    this.oneTimeToken = jsonObject['one-time-token'];
    this.imageUrl = jsonObject['image-url'];
  }
}
