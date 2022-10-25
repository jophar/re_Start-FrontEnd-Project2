import { Component, OnInit } from '@angular/core';
import { JsonService } from '../shared/json.service';
import { Product } from '../shared/product';
import { User } from '../shared/user';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})

export class HighlightsComponent implements OnInit {

  productArray : Product[] = [];
  userArray : User[] = [];
  productTotal : number = 0;
  erro : string = "";

  constructor(private serverConnect : JsonService) { }

  ngOnInit(): void {
    this.readProductDataFromServer();
    //this.readUsersFromDB();
  }

  readProductDataFromServer() {
        this.serverConnect.getHighlights().subscribe({
            next : product => {
            this.productArray = product.body!;
            this.productTotal = this.productArray.length;
            console.log(this.productTotal);
          },
            error : error => {
            console.log("Ocorreu um erro!"+ error);
            this.erro = error;
          }
        });
  }

  readUsersFromDB() {
    this.serverConnect.getUsers().subscribe({
      next : user => { this.userArray = user.body!; } 
    })
    console.log(this.userArray.length);
  }
}
