import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Job} from '../../models/job/job';
import {MapLocation} from '../../models/map-location';
import {Geolocation} from '../../services/geolocation.service';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {customMapStyle} from '../../styles/google-maps-styles';
import {yyyymmdd, nbrOfMonthsFromDate} from '../../utils/date-util';

@Component({
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends SystemLanguageListener implements OnInit {
  jobs: Job[];
  totalJobs: number = 0;
  page: number = 1;
  pageSize: number = 10;
  loadingJobs: boolean = true;

  mapZoom: number = 5;
  mapLocation: MapLocation = new MapLocation({ longitude: 18.0675109, latitude: 59.3349086 });
  mapUserLocation: MapLocation;
  mapStyles = customMapStyle;
  mapError: string;
  mapErrorShow: boolean = false;

  constructor(
    private router: Router,
    private jobProxy: JobProxy,
    private location: Location,
    private route: ActivatedRoute,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    private geolocationService: Geolocation
  ) {
    super(systemLanguagesResolver);

    this.route.params.subscribe(params => {
      this.page = params['page'] && parseInt(params['page']);
      if (!this.page || this.page < 1) {
        this.location.replaceState('/jobs/' + 1);
        this.page = 1;
      }
      this.loadData();
    });
  }

  ngOnInit() {
    this.initLocation();
  }

  loadData() {
    this.loadingJobs = true;
    this.jobProxy.getJobs(
      {
        include: 'company,hourly_pay,company.company_images',
        'filter[filled]': false,
        'page[number]': this.page.toString(),
        'filter[job_date]': yyyymmdd(new Date()) + '..' + yyyymmdd(nbrOfMonthsFromDate(new Date(), 6))
      })
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
        this.loadingJobs = false;
        if (this.pageSize * (this.page - 1) > this.totalJobs) {
          this.onPageChange(1);
        } else if (this.totalJobs === 0) {
          this.page = 0;
        }
      });
  }

  private initLocation() {
    this.geolocationService.getLocation().subscribe(position => {
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

  onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }

  mapTooltipClicked() {
    this.mapErrorShow = false;
  }
}
