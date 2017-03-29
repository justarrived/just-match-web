import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class GeolocationService {

	/**
	 * Obtains the geographic position, in terms of latitude and longitude coordinates, of the device.
	 * @param {any} [opts] An object literal to specify one or more of the following attributes and desired values:
	 *   - enableHighAccuracy: Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption.
	 *   - timeout: An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
	 *              If timeout is Infinity, (the default value) the location request will not time out.
	 *              If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
	 *   - maximumAge: An Integer value indicating the maximum age, in milliseconds, of cached position information.
	 *                 If maximumAge is non-zero, and a cached position that is no older than maximumAge is available, the cached position is used instead of obtaining an updated location.
	 *                 If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
	 *                 If maximumAge is Infinity, any cached position is used, regardless of its age, and watchPosition only tries to obtain an updated position if no cached position data exists.
	 * @returns {Observable} An observable sequence with the geographical location of the device running the client.
	 */
  public getLocation(opts?): Observable<any> {

    return Observable.create(observer => {

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
            observer.complete();
          },
          error => {
            switch (error.code) {
              case 1:
                observer.error('map.geolocation.error.permissionDenied');
                break;
              case 2:
                observer.error('map.geolocation.error.positionUnavailable');
                break;
              case 3:
                observer.error('map.geolocation.error.timeout');
                break;
            }
          },
          opts);
      }
      else {
        observer.error('map.geolocation.error.unsupportedBrowser');
      }

    });

  }
}
