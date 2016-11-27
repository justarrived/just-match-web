export class UserImage {
  oneTimeToken: string;
  imageUrl: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.oneTimeToken = jsonObject.one_time_token;
    this.imageUrl = jsonObject.image_url;
  }
}
