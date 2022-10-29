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
  allProducts! : Product[];

  typeList : string[] = [];
  colorList : string[] = [];

  maleSubMenu : string[] = ["Casacos", "Camisas", "Calças", "Sweatshirts", "Polos", "Sapatos", "T-Shirts", "Todos"];
  maleSubMenuDB : string[] = ["Casaco", "Camisa", "Calças", "Sweatshirt", "Polo", "Sapatos", "T-Shirt", "Todos"];
  womanSubMenu : string[] = ["Vestidos", "Blusões", "Coletes", "Jeans", "Saias", "Calções", "Lingerie", "Sapatos", "Malas", "Todos"];
  womanSubMenuDB : string[] = ["Vestido", "Blusão", "Colete", "Jeans", "Saia", "Calções", "Lingerie", "Sapatos", "Mala", "Todos"];
  kinderSubMenu : string[] = ["Menina | 6-14 Anos", "Menino | 6-14 Anos", "Bebé Menina | 3 Meses - 5 Anos", "Bebé Menino | 3 Meses - 5 Anos", "Mini | 0-12 Meses"];
  accessoriesSubMenu : string [] = ["Malas", "Pulseiras", "Aneis"];
  accessoriesSubMenuDB : string [] = ["Mala", "Pulseira", "Anel"];

  starActive : Boolean = false;

  start : number = 0;
  numRecords : number = 6;

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => { 
      this.currentProductType = params.get('type')!;
      this.currentProductSubType = params.get('subMenu')!;
      this.correctProductSubtype(this.currentProductSubType);
      this.getProductsByType();
      this.getAllProducts();
    });

  }

  correctProductSubtype(subType : string) {
    switch(this.currentProductType) {
      case "Homem" : { this.currentProductSubTypeCorrected = this.maleSubMenuDB[this.maleSubMenu.indexOf(subType)]; } break;
      case "Mulher" : { this.currentProductSubTypeCorrected = this.womanSubMenuDB[this.womanSubMenu.indexOf(subType)]; } break;
      case "Criança" : { this.currentProductSubTypeCorrected = this.currentProductSubType } break;
      case "Acessórios" : { this.currentProductSubTypeCorrected = this.accessoriesSubMenuDB[this.accessoriesSubMenu.indexOf(subType)]; } break;
    }
  }

  getProductsByType() {
      this.serverConnect.getProductsWithPages(this.currentProductSubTypeCorrected, this.start, this.numRecords).subscribe({
        next : product => {
        this.activeProducts = product.body!;
        this.activeProductsNumber = Number(product.headers.get('x-total-count'));
        }});   
  }

  getAllProducts() {
    this.serverConnect.getProducts().subscribe({
      next : p => {
        this.allProducts = p.body!;
        this.getTypeList();
        this.getColorList();
      }
    });
  }

  getTypeList() {
    for(let p of this.allProducts) {
      this.typeList.push(p.tipo_de_produto);
    }
   // for(let i = 0; i <= this.colorList.length; i++) {
   //   this.typeList[i] = this.maleSubMenu[this.typeList.indexOf(this.typeList[i])];
   // }
    this.typeList.push("Todos");
    this.typeList = [...new Set(this.typeList.sort())];
  }
  

  getColorList() {
    for(let p of this.allProducts) {
      this.colorList.push(p.cor);
    }
    this.colorList = [...new Set(this.colorList.sort())];
    this.colorList.push("Todos");
  }

  moreProducts() {
    if (( this.start + this.numRecords ) < this.activeProductsNumber) {
      this.numRecords += this.numRecords;
      this.getProductsByType();
    }
  }

  productSelector(type : string) {
    this.currentProductSubTypeCorrected = type;
    this.getProductsByType();
  }

  colorSelector(color : string) {
    this.activeProducts = this.activeProducts.filter(p => p.cor === color);
    this.activeProductsNumber = this.activeProducts.length;
  }

  addToWishlist(id : number) {
    if(!this.starActive) { this.starActive = true; }
      else { this.starActive = false; }
  }
}

 