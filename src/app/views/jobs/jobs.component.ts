import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Job} from '../../models/job/job';
import {MapLocation} from '../../models/map-location';
import {Geolocation} from '../../services/geolocation.service';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TranslationService} from '../../services/translation.service';
import {TranslationListener} from '../../components/translation.component';
import {customMapStyle} from '../../styles/google-maps-styles'
import {yyyymmdd} from '../../utils/date-util'

@Component({
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [JobProxy]
})
export class JobsComponent extends TranslationListener implements OnInit {
  private jobs: Job[];
  private totalJobs: number = 1;
  private page: number = 1;
  private pageSize: number = 10;
  private loadingJobs: boolean = true;

  private mapZoom: number = 5;
  private mapLocation: MapLocation = new MapLocation({ longitude: 18.0675109, latitude: 59.3349086 });
  private mapUserLocation: MapLocation;
  private mapStyles = customMapStyle;
  private mapError: string;
  private mapErrorShow: boolean = false;

  constructor(
    private router: Router,
    private jobProxy: JobProxy,
    private location: Location,
    private route: ActivatedRoute,
    protected translationService: TranslationService,
    private geolocationService: Geolocation
  ) {
    super(translationService);

    this.route.params.subscribe(params => {
      this.page = (params['page'] && parseInt(params['page'])) || 1;
    });
  }

  ngOnInit() {
    this.loadData();

    this.initLocation();
  }

  loadData() {
    this.loadingJobs = true;
    this.jobProxy.getJobs({ include: 'company,hourly_pay,company.company_images', 'filter[filled]': false, 'page[number]': this.page.toString(), 'filter[job_date]': yyyymmdd(new Date()) })
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
        this.loadingJobs = false;
      });
  }

  private initLocation() {
    this.geolocationService.getLocation().subscribe(
      position => {
        this.mapUserLocation = new MapLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.mapLocation = this.mapUserLocation;
        this.mapZoom = 12;
      },
      error => {
        this.mapError = error;
        this.mapErrorShow = true;
      }
    );
  }

  private onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }

  private mapTooltipClicked() {
    this.mapErrorShow = false;
  }
}
