export class MapLocation {
  latitude: number;
  longitude: number;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }
    this.latitude = jsonObject.latitude;
    this.longitude = jsonObject.longitude;
  }
}
