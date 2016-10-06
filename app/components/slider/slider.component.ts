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


  resize(event) {
    console.log('resize', event);
  }

  mouseDown(event) {
    this.isSliderContainerClicked = true;
  }

  mouseUp(event) {
    this.isSliderContainerClicked = false;
  }

  mouseMove(event) {
    if (this.isSliderContainerClicked) {
      console.log(event);
    }
  }
}
