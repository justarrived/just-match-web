export class UserImage {
  // API fields
  public category: string;
  public categoryName: string;
  public id: string;
  public imageUrl: string;
  public largeImageUrl: string;
  public mediumImageUrl: string;
  public oneTimeToken: string;
  public oneTimeTokenExpiresAt: Date;
  public smallImageUrl: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.category = jsonObject.category;
    this.categoryName = jsonObject.category_name;
    this.id = jsonObject.id;
    this.imageUrl = jsonObject.image_url;
    this.largeImageUrl = jsonObject.image_url_large;
    this.mediumImageUrl = jsonObject.image_url_medium;
    this.oneTimeToken = jsonObject.one_time_token;
    this.oneTimeTokenExpiresAt = new Date(jsonObject.one_time_token_expires_at);
    this.smallImageUrl = jsonObject.image_url_small;
  }
}
