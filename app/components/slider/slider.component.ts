import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {Job} from "../../models/job/job";

@Component({
    moduleId: module.id,
    selector: 'slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() jobs: Array<Job>;
  private sliderContainer: any;
  private isSliderContainerClicked: boolean = false;
  isCompanyUser: boolean = false;

  constructor(private slider: ElementRef) {
    console.log(this.slider.nativeElement.getElementsByClassName('slider'));
  }

  ngOnInit() {
    this.sliderContainer = this.slider.nativeElement.getElementsByClassName('slider')[0];
  }

  swipeLeft(event) {
    console.log('swipeLeft');
  }

  swipeRight() {

  }


  resize(event) {
    console.log('resize', event);
  }
}
