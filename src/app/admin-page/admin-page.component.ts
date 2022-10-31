// SETUP DE COMPONENTE ERRADO!
// DEVIA USAR A RELACAO PARENT/CHILD PARA PODER ACEDER AOS METODOS
// DO PRODUCTBROWSE E EVITAR A DUPLICAÇÃO DE TRABALHO
// REVER SE TIVER TEMPO

import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ControlContainer } from '@angular/forms';
import { ProductBrowseComponent } from '../product-browse/product-browse.component';
import { JsonService } from '../shared/json.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  productId = (item: Product): number => item.id!;

  insertProductForm! : FormGroup;

  product! : Product;
  productToInsert! : Product;
  allProducts! : Product[];
  typeList : string[] = [];
  secondImage : boolean[] = [];
  deleteConfirm : boolean[] = [];
  

  constructor(private serverConnect: JsonService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.insertProductForm = new FormGroup({
      nome: new FormControl(''),
      marca: new FormControl(''),
      tipo_de_produto: new FormControl(''),
      cor: new FormControl(''),
      preco: new FormControl(''),
      descricao: new  FormControl(''),
      destaque: new FormControl(''),
      foto_principal: new FormControl(''),
      foto_secundaria: new FormControl('')
    });
  }

  insertProduct() {
    if (this.insertProductForm.valid) { 

      this.serverConnect.insertProductToDatabase(this.insertProductForm.value).subscribe(registoInserido => {
        console.log(registoInserido);
        this.getAllProducts();
        console.log("ESTOU AQUI!");
    });}
  }

  getTypeList() {
    for(let p of this.allProducts) {
      this.typeList.push(p.tipo_de_produto);
    }
    this.typeList = [...new Set(this.typeList.sort())];
  }

  getAllProducts() {
    this.serverConnect.getProducts().subscribe({
      next : p => {
        this.allProducts = p.body!;
        this.getTypeList();
      }});
  }

 deleteProduct(productId : number) {
  this.serverConnect.deleteProductFromDatabase(productId).subscribe({
    next : p => {
      this.getAllProducts();
      this.deleteConfirm = [];
    }});
 }

}
