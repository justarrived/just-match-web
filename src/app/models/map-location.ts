export class MapLocation {
  public latitude: number;
  public longitude: number;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.latitude = jsonObject.latitude;
    this.longitude = jsonObject.longitude;
  }
}
