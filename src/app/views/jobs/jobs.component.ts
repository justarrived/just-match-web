import {Component, OnInit} from '@angular/core';
import {Job} from '../../models/job/job';
import {MapLocation} from '../../models/map-location';
import {Geolocation} from '../../services/geolocation.service';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TranslationService} from '../../services/translation.service';
import {TranslationListener} from '../../components/translation.component';

@Component({
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [JobProxy]
})
export class JobsComponent extends TranslationListener implements OnInit {
  jobs: Job[];
  totalJobs: number = 1;
  page: number = 1;
  pageSize: number = 10;
  mapLocation: MapLocation = new MapLocation({
    longitude: 18.0675109,
    latitude: 59.3349086
  });
  mapError: string;

  constructor(private jobProxy: JobProxy, private location: Location, private route: ActivatedRoute, protected translationService: TranslationService, private geolocationService: Geolocation) {
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
    this.jobProxy.getJobs({ include: 'owner,company,hourly_pay,company.company_images', 'filter[filled]': false, 'page[number]': this.page.toString() })
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
      });
  }

  initLocation() {
    this.geolocationService.getLocation().subscribe(
      position => this.mapLocation = new MapLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }),
      error => {
        this.mapError = error;
      }
    );
  }

  onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }
}
