import { ThisReceiver } from '@angular/compiler';
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

  constructor(private jsonplaceholder : JsonService) { }

  ngOnInit(): void {
    this.readProductDataFromServer();
    //this.readUsersFromDB();
  }

  readProductDataFromServer() {
        this.jsonplaceholder.getHighlights().subscribe({
            next : product => {
            this.productArray = product;
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
    this.jsonplaceholder.getUsers().subscribe({
      next : user => { this.userArray = user.body!; } 
    })
    console.log(this.userArray.length);
  }
}
