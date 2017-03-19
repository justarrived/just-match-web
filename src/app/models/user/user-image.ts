export class UserImage {
  public category: string;
  public id: string;
  public imageUrl: string;
  public largeImageUrl: string;
  public mediumImageUrl: string;
  public smallImageUrl: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.category = jsonObject.category;
    this.id = jsonObject.id;
    this.imageUrl = jsonObject.image_url;
    this.largeImageUrl = jsonObject.image_url_large;
    this.mediumImageUrl = jsonObject.image_url_medium;
    this.smallImageUrl = jsonObject.image_url_small;
  }
}
