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


  mapZoom: number = 5;
  mapLocation: MapLocation = new MapLocation({ longitude: 18.0675109, latitude: 59.3349086 });
  mapUserLocation: MapLocation;
  mapStyles = [{ "elementType": "geometry", "stylers": [{ "hue": "#ff4400" }, { "saturation": -68 }, { "lightness": -4 }, { "gamma": 0.72 }] }, { "featureType": "road", "elementType": "labels.icon" }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "hue": "#0077ff" }, { "gamma": 3.1 }] }, { "featureType": "water", "stylers": [{ "hue": "#00ccff" }, { "gamma": 0.44 }, { "saturation": -33 }] }, { "featureType": "poi.park", "stylers": [{ "hue": "#44ff00" }, { "saturation": -23 }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "hue": "#007fff" }, { "gamma": 0.77 }, { "saturation": 65 }, { "lightness": 99 }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "gamma": 0.11 }, { "weight": 5.6 }, { "saturation": 99 }, { "hue": "#0091ff" }, { "lightness": -86 }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "lightness": -48 }, { "hue": "#ff5e00" }, { "gamma": 1.2 }, { "saturation": -23 }] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -64 }, { "hue": "#ff9100" }, { "lightness": 16 }, { "gamma": 0.47 }, { "weight": 2.7 }] }]

  constructor(private router: Router, private jobProxy: JobProxy, private location: Location, private route: ActivatedRoute, protected translationService: TranslationService, private geolocationService: Geolocation) {
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
      position => {
        this.mapUserLocation = new MapLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.mapLocation = this.mapUserLocation;
        this.mapZoom = 12;
      },
      error => {
        console.log(error);
      }
    );
  }

  onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }

  mapJobMarkerClicked(job) {
    this.router.navigate(['/job', job.id]);
  }
}
