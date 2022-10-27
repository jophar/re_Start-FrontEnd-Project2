import { Component, OnInit } from '@angular/core';
import { JsonService } from '../shared/json.service';
import { Product } from '../shared/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private actRoute : ActivatedRoute, private serverConnect : JsonService, private loc : Location) { }

  productToShow! : Product;
  productId! : number;


  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => { this.productId = Number(params.get('id')); });
    // this.productId = +this.actRoute.snapshot.paramMap.get('id')!;
    this.readProductInfo(Number(this.productId)); 

  }

  readProductInfo(id : number) {
    this.serverConnect.getOneProduct(id).subscribe({ next: prod => { this.productToShow = prod!; } }); 
    console.log(this.productId);
  }

  back() {
    this.loc.back();
  }

}
