export class UserImage {
  id: string;
  oneTimeToken: string;
  imageUrl: string;
  category: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.one_time_token;
    this.imageUrl = jsonObject.image_url;
    this.category = jsonObject.category;
  }
}
