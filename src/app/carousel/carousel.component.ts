import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})

export class CarouselComponent {

  images = [
    {src: "../../assets/img/slider1.jpg"},
    {src: "../../assets/img/slider2.jpg"},
    {src: "../../assets/img/slider3.jpg"}
  ];
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

}
