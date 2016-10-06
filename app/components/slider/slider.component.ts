import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {
  private sliderContainer: any;
  private isSliderContainerClicked: boolean = false;

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
