import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { JsonService } from '../shared/jsonservice';
import { Product } from '../shared/product';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {

  productArray : Product[] = [];
  productTotal : number = 0;
  erro : string = "";

  constructor(private jsonplaceholder : JsonService) { }

  ngOnInit(): void {
    this.readProductDataFromServer();
  }

  readProductDataFromServer() {
        this.jsonplaceholder.getHighlights().subscribe({
            next : product => {
            this.productArray = product;
            this.productTotal = this.productArray.length;
          },
            error : error => {
            console.log("Ocorreu um erro!"+ error);
            this.erro = error;
          },
        });

          console.log(this.productTotal);
  }
}
