import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {

  @Input() productInfo! : Product;

  secondImage : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
