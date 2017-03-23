export class CompanyImage {
  // API fields
  public categoryName: string;
  public id: string;
  public imageUrl: string;
  public imageUrlLarge: string;
  public imageUrlMedium: string;
  public imageUrlSmall: string;
  public oneTimeToken: string;
  public oneTimeTokenExpiresAt: Date;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.categoryName = jsonObject.category_name;
    this.id = jsonObject.id;
    this.imageUrl = jsonObject.image_url;
    this.imageUrlLarge = jsonObject.image_url_large;
    this.imageUrlMedium = jsonObject.image_url_medium;
    this.imageUrlSmall = jsonObject.image_url_small;
    this.oneTimeToken = jsonObject.one_time_token;
    this.oneTimeTokenExpiresAt = new Date(jsonObject.one_time_token_expires_at);
  }
}
