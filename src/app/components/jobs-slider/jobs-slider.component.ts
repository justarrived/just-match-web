import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';


@Component({
  selector: 'jobs-slider',
  templateUrl: './jobs-slider.component.html',
  styleUrls: ['./jobs-slider.component.scss']
})
export class JobsSliderComponent implements OnInit {
  @Input() title: String;
  @Input() linkDestination: any;
  @Input() linkTitle: any;
  @Input() sliderStyle: String;
  private JARoutes = JARoutes;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  ngOnInit() {
  }

}
