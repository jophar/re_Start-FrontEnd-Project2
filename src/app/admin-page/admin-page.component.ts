// SETUP DE COMPONENTE ERRADO!
// DEVIA USAR A RELACAO PARENT/CHILD PARA PODER ACEDER AOS METODOS
// DO PRODUCTBROWSE E EVITAR A DUPLICAÇÃO DE TRABALHO
// REVER SE TIVER TEMPO

import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ControlContainer } from '@angular/forms';
import { JsonService } from '../shared/json.service';
import { Product } from '../shared/product';
import { User } from '../shared/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  productId = (item: Product): number => item.id!;

  insertProductForm! : FormGroup;
  pageSize = 5;
  returnMessage : string = "";
  activeProductsNumber : number = 0;
  product! : Product;
  productToInsert! : Product;
  allProducts! : Product[];
  typeList : string[] = [];
  secondImage : boolean[] = [];
  deleteConfirm : boolean[] = [];
  
  productInsertOk : number = 3;

  numberOfHighlights : number = 0;

  productsPerPage : number = 5;
  numberOfPages : number = 0;

  page = 1;

  userList : User[] = [];

  oneUser! : User;

  constructor(private serverConnect: JsonService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getNonActiveUsers();
    this.insertProductForm = new FormGroup({
      nome: new FormControl(''),
      marca: new FormControl(''),
      tipo_de_produto: new FormControl(''),
      cor: new FormControl(''),
      preco: new FormControl(''),
      descricao: new  FormControl(''),
      destaque: new FormControl(''),
      foto_principal: new FormControl('no_image_yet.jpg'),
      foto_secundaria: new FormControl('no_image_yet_2.jpg')
    });
  }

  insertProduct() {
    if (this.insertProductForm.valid && this.numberOfHighlights < 8) {
      this.serverConnect.insertProductToDatabase(this.insertProductForm.value).subscribe(async registoInserido => {
        let dataReturn = registoInserido;
        if (dataReturn.status === 201) {
          console.log(this.insertProductForm.value.foto_principal);
          this.insertProductForm.reset({foto_principal: "no_image_yet.jpg", foto_secundaria: "no_image_yet_2.jpg"});
          this.getAllProducts();
          this.productInsertOk = 1;
          this.returnMessage = "Produto inserido com sucesso";
        }
        else{
          this.productInsertOk = 2;
          this.returnMessage = "Erro na ligação à base de dados";
        }});
    }
    else {
      this.productInsertOk = 2;
      this.returnMessage = "Já existem 8 destaques. Tente editar ou eliminar primeiro";
    }
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
        this.numberOfHighlights = 0;
        this.activeProductsNumber = this.allProducts.length;

        for(let pro of this.allProducts){  
          if(pro.destaque == true)
           this.numberOfHighlights++;
        }
      }});
  }

 deleteProduct(productId : number) {
  this.serverConnect.deleteProductFromDatabase(productId).subscribe({
    next : p => {
      this.getAllProducts();
      this.deleteConfirm = [];
    }});
 }

 searchProduct(searchString : string) {
  this.serverConnect.searchProduct(searchString).subscribe({
      next: products => {
        this.allProducts = products.body!;
      }
    });
  }

  getNonActiveUsers() {
    this.serverConnect.getNonActiveUsers().subscribe({
      next: u => {
        this.userList = u.body!;
        console.log(this.userList.length)
      }
    })
  }

  getOneUser(id: number) {
    this.serverConnect.getOneUser(id).subscribe({
      next: p => {
        this.oneUser = p.body!;
      }
    })
  }

  deleteUser(userId : number) {
    this.serverConnect.deleteUserFromDatabase(userId).subscribe({
      next : p => {
        this.getNonActiveUsers();
      }});
  }

  authorizeUser(userId : number) {
    this.getOneUser(userId);
    this.oneUser.active = true;
    this.serverConnect.authorizeUserInSite(userId, this.oneUser).subscribe({
      next : i => {
        this.getNonActiveUsers();
      }
    });
    
  }
}
