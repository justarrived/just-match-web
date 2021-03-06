import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {customMapStyle} from '../../../styles/google-maps-styles';
import {GeolocationService} from '../../../services/geolocation.service';
import {Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {MapLocation} from '../../../models/client-models/map-location/map-location';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {PLATFORM_ID} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

@Component({
  selector: 'jobs-map',
  template: `
    <div class="ui form jobs-map-container">
      <basic-loader
        [promise]="jobs"
        class="inverted">
      </basic-loader>
      <agm-map
        [disableDefaultUI]="true"
        [latitude]="mapLocation.latitude"
        [longitude]="mapLocation.longitude"
        [scrollwheel]="false"
        [streetViewControl]="false"
        [styles]="mapStyles"
        [zoom]="mapZoom"
        *ngIf="!isServer"
        class="jobs-map">
        <agm-marker
          [latitude]="mapUserLocation.latitude"
          [longitude]="mapUserLocation.longitude"
          *ngIf="mapUserLocation">
        </agm-marker>
        <job-map-marker
          [job]="job"
          *ngFor="let job of jobs | async">
        </job-map-marker>
      </agm-map>
      <div class="jobs-map-tooltip tooltip-top tooltip-color-blue">
        <span
          class="jobs-map-tooltip-content"
          [class.tooltip-visible]="mapErrorShow"
          (click)="mapTooltipClicked()">
          <basic-text
            [text]="'map.geolocation.error.prefix' | translate: {mapError: mapError | translate}"
            color="white"
            fontSize="small"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <basic-link
            [text]="'map.geolocation.error.close' | translate"
            class="jobs-map-tooltip-close-link"
            color="white"
            hoverColor="white"
            fontSize="small"
            textAlignmentLtr="center"
            textAlignmentRtl="center"
            marginBottom="0">
          </basic-link>
        </span>
      </div>
    </div>`,
  styleUrls: ['./jobs-map.component.scss']
})
export class JobsMapComponent extends BaseComponent {
  private readonly defaultMapLocation = new MapLocation({ longitude: 18.0675109, latitude: 59.3349086 });
  private readonly defaultMapZoom = 5;
  private readonly defaultMapStyle = customMapStyle;

  public isServer: boolean = false;
  public jobs: Promise<Job[]>;
  public mapError: string;
  public mapErrorShow: boolean = false;
  public mapLocation: MapLocation = this.defaultMapLocation;
  public mapStyles = this.defaultMapStyle;
  public mapUserLocation: MapLocation;
  public mapZoom: number = this.defaultMapZoom;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private geolocationService: GeolocationService,
    private jobProxy: JobProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.initLocation();
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private initLocation() {
    if (isPlatformBrowser(this.platformId)) {
      this.geolocationService.getLocation().subscribe(position => {
        this.mapUserLocation = new MapLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.mapLocation = this.mapUserLocation;
      },
      error => {
        this.mapError = error;
        this.mapErrorShow = true;
      });
    } else {
      this.isServer = true;
    }
  }

  private loadData() {
    this.jobs = this.jobProxy.getJobs({
      'include': 'company,hourly_pay,company.company_images',
      'filter[open_for_applications]': true,
      'page[size]': 50,
    });
  }

  public mapTooltipClicked() {
    this.mapErrorShow = false;
  }
}
