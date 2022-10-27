import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../shared/json.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-browse',
  templateUrl: './product-browse.component.html',
  styleUrls: ['./product-browse.component.css']
})
export class ProductBrowseComponent implements OnInit{

  constructor(private actRoute: ActivatedRoute, private serverConnect: JsonService) { }

  currentProductSubType : string = "";
  currentProductSubTypeCorrected : string = "";
  currentProductType : string = "";

  activeProducts! : Product[];
  activeProductsNumber : number = 0;

  maleSubMenu : string[] = ["Casacos", "Camisas", "Calças", "Sweatshirts", "Polos", "Sapatos", "T-Shirts", "Todos"];
  maleSubMenuDB : string[] = ["Casaco", "Camisa", "Calças", "Sweatshirt", "Polo", "Sapatos", "T-Shirt", "Todos"];
  womanSubMenu : string[] = ["Vestidos", "Blusões", "Coletes", "Jeans", "Saias", "Calções", "Lingerie", "Sapatos", "Malas", "Todos"];
  womanSubMenuDB : string[] = ["Vestido", "Blusão", "Colete", "Jeans", "Saia", "Calções", "Lingerie", "Sapatos", "Mala", "Todos"];
  kinderSubMenu : string[] = ["Menina | 6-14 Anos", "Menino | 6-14 Anos", "Bebé Menina | 3 Meses - 5 Anos", "Bebé Menino | 3 Meses - 5 Anos", "Mini | 0-12 Meses"];
  accessoriesSubMenu : string [] = ["Malas", "Pulseiras", "Aneis"];
  accessoriesSubMenuDB : string [] = ["Mala", "Pulseira", "Anel"];

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => { 
      this.currentProductType = params.get('type')!;
      this.currentProductSubType = params.get('subMenu')!;
      this.correctProductSubtype(this.currentProductSubType);
      this.getProductsByType();
    });
  }

  correctProductSubtype(subType : string) {
    switch(this.currentProductType) {
      case "Homem" : { 
        this.currentProductSubTypeCorrected = this.maleSubMenuDB[this.maleSubMenu.indexOf(subType)]; 
        console.log(subType);
      } break;

      case "Mulher" : { this.currentProductSubTypeCorrected = this.womanSubMenuDB[this.womanSubMenu.indexOf(subType)]; } break;
      case "Criança" : { this.currentProductSubTypeCorrected = this.currentProductSubType } break;
      case "Acessórios" : { this.currentProductSubTypeCorrected = this.accessoriesSubMenuDB[this.accessoriesSubMenu.indexOf(subType)]; } break;
    }
  }

  getProductsByType() {
    if(this.currentProductSubTypeCorrected === "Todos") {
      this.serverConnect.getProducts().subscribe({
        next : product => {
        this.activeProducts = product.body!.sort((a, b) => (a.tipo_de_produto > b.tipo_de_produto) ? 1 : -1);
        this.activeProductsNumber = this.activeProducts.length;
        }});
    }
    else {
      this.serverConnect.getProductsByType(this.currentProductSubTypeCorrected).subscribe({
        next : product => {
        this.activeProducts = product.body!;
        this.activeProductsNumber = this.activeProducts.length; }});
    }
  }

  testing() {
    console.log(this.activeProductsNumber);
    
  }

}

 