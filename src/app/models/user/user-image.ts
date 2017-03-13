export class UserImage {
  id: string;
  imageUrl: string;
  smallImageUrl: string;
  mediumImageUrl: string;
  largeImageUrl: string;
  category: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.imageUrl = jsonObject.image_url;
    this.smallImageUrl = jsonObject.image_url_small;
    this.mediumImageUrl = jsonObject.image_url_medium;
    this.largeImageUrl = jsonObject.image_url_large;
    this.category = jsonObject.category;
  }
}
